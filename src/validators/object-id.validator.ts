import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator'
import { Types as MongooseTypes } from 'mongoose'

/**
 * Source: https://github.com/quantumsheep/class-validator-mongo-object-id
 * Modified by triszt4n for better validation messaging
 * @author quantumsheep
 * @param validationOptions
 * @returns classvalidator property decorator for checking input formatting
 */
export function IsObjectId(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isObjectId',
      target: object.constructor,
      propertyName,
      options: {
        ...validationOptions,
        message: `${propertyName} is not an ObjectId`,
      },
      validator: {
        validate(value: any, args: ValidationArguments) {
          return MongooseTypes.ObjectId.isValid(value)
        },
      },
    })
  }
}

/**
 * @author triszt4n
 * @param validationOptions
 * @returns classvalidator property decorator for checking input formatting
 */
export function IsObjectIdArray(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isObjectId',
      target: object.constructor,
      propertyName,
      options: {
        ...validationOptions,
        message: `${propertyName} is not an array of ObjectIds`,
      },
      validator: {
        validate(value: any, args: ValidationArguments) {
          return (
            Array.isArray(value) &&
            value.every((element) => MongooseTypes.ObjectId.isValid(element))
          )
        },
      },
    })
  }
}

import { BadRequestException } from '@nestjs/common';
import messages from 'constants/validationMessages';
import { ValidationError } from 'types';

export class ValidationException extends BadRequestException {
  public errors: ValidationError;

  constructor(errors: ValidationError) {
    super(messages.VALIDATION_ERROR);

    this.errors = errors;
  }
}

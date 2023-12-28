import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiExtraModels,
  getSchemaPath,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { ApiResponse } from 'helpers/ApiResponse';
import messages from 'constants/successMessages';

export const ApiRegisterUserResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiExtraModels(ApiResponse, model),
    ApiCreatedResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiResponse) },
          { properties: { data: { $ref: getSchemaPath(model) } } },
        ],
      },
      description: messages.USER_REGISTER_MSG,
    }),
  );
};

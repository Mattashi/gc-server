import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true, versionKey: false })
export class User {
  @ApiProperty()
  @Prop({ unique: true })
  userId: string;

  @ApiProperty({ required: false })
  @Prop()
  username: string;

  @ApiProperty()
  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @ApiProperty({ required: false })
  @Prop()
  avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

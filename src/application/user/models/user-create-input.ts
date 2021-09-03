import { IsEmail, IsNotEmpty, Length, MinLength } from 'class-validator';

export class UserCreateInput {
  @Length(3, 30)
  @IsNotEmpty()
  username!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @MinLength(5)
  @IsNotEmpty()
  password!: string;
}

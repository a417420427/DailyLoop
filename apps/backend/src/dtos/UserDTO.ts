import { IsString, IsNotEmpty, Length, IsOptional } from "class-validator";

export class RegisterUserDTO {
  @IsString()
  @IsNotEmpty()
  @Length(10, 20)  // 手机号长度限制
  phone!: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 100)  // 密码长度限制
  password!: string;

  @IsString()
  @IsOptional()
  username?: string;
}

export class LoginUserDTO {
  @IsString()
  @IsNotEmpty()
  phone!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}

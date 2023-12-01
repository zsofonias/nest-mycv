import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDTO } from './create-user.dto';

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
// export class UpdateUserDTO {
//   @IsEmail()
//   @IsOptional()
//   email: string;

//   @IsString()
//   @IsOptional()
//   password: string;
// }

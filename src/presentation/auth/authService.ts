
import { CustomError } from "../../errors/custom.error";
import { LoginUserDto } from "./dto/loginUserDto";
import { UpdateUserProfileDto } from "./dto/updateUserProfileDto";
import { UserRepository } from "./userRepository";
import jwt from 'jsonwebtoken';



export class AuthService {

  // DI
  constructor() {}

  private removeUndefined(obj: { [key: string]: any }) {
    return Object.keys(obj).reduce((acc, key) => {
      if (obj[key] !== undefined) {
        acc[key] = obj[key];
      }
      return acc;
    }, {} as { [key: string]: any });
  }


  public async loginUser( loginUserDto: LoginUserDto ) {

      
      const userRepository = new UserRepository();
      const user =  await userRepository.getUserByEmail(loginUserDto.email);
      
      console.log(loginUserDto.password, user.password)
      
      if (loginUserDto.password !== user.password) throw 'unauthorized';
      
      const token = jwt.sign(
          { id: user._id },
          'JWT_SEED',
          { expiresIn: '2h' }
        );
        
        if ( !token ) throw 'Error while creating JWT';
        const { password, ...userResponse } = user;
        
        return {
            user: userResponse,
            token: token
        }
  }

  public async getProfile( token: string ) {
    const userRepository = new UserRepository();
    const payload = jwt.verify(token, 'JWT_SEED');

    const { id } = payload as { id: string };
    if ( !id ) throw CustomError.internalServer('Email not in token');

    const user = await userRepository.getUserByid( id );
    if ( !user ) throw CustomError.internalServer('Email not exists');

    const { password, ...userResponse } = user;
    
    return {
        user: userResponse
    }
  }

  public async updateProfile( token: string, updateUserProfileDto: UpdateUserProfileDto ) {
    const userRepository = new UserRepository();
    const payload = jwt.verify(token, 'JWT_SEED');

    const { id } = payload as { id: string };
    if ( !id ) throw CustomError.internalServer('Email not in token');

    const userDb = await userRepository.getUserByid( id );
    if ( !userDb ) throw CustomError.internalServer('Email not exists');

    const cleanUserDto = this.removeUndefined(updateUserProfileDto);

    console.log(cleanUserDto);

    //create user data


    await userRepository.updateUserByid(id, {...userDb, ...cleanUserDto });

    const { password, ...userResponse } = cleanUserDto;
    
    return {
        user: userResponse
    }
  }


}
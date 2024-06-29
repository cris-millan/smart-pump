import { Request, Response } from "express";
import { UserRepository } from "./userRepository";
import { LoginUserDto } from "./dto/loginUserDto";
import { AuthService } from "./authService";
import { CustomError } from "../../errors/custom.error";
import { UpdateUserProfileDto } from "./dto/updateUserProfileDto";

export class AuthController {

    constructor(
        public readonly authService: AuthService,
    ) {
    }

    private handleError = (error: unknown, res: Response ) => {
        if ( error instanceof CustomError ) {
          return res.status(error.statusCode).json({ error: error.message });
        }
    
        console.log(`${ error }`);
        return res.status(500).json({ error: 'Internal server error' })
      } 

    public postAuth = async (req: Request, res: Response) => {
        const [error, loginUserDto] = LoginUserDto.create(req.body);

        if ( error ) return res.status(400).json({error})


        this.authService.loginUser(loginUserDto!)
            .then( (user) => res.json(user))
            .catch( error => this.handleError(error, res) );
    }

    public getProfile = (req: Request, res: Response) => {

        const { token } = req.params;

        console.log({token});
        this.authService.getProfile( token )
        .then( (user) => res.json(user) )
        .catch( error => this.handleError(error, res) );
    }

    public updateProfile = (req: Request, res: Response) => {

        const { token } = req.params;

        const [error, updateUserProfileDto] = UpdateUserProfileDto.create(req.body);

        if ( error ) return res.status(400).json({error})

        // console.log(updateUserProfileDto);

        // this.authService.getProfile( token )
        // .then( (user) => res.json(user) )
        // .catch( error => this.handleError(error, res) );

        this.authService.updateProfile( token, updateUserProfileDto! )
        .then( (user) => res.json(user) )
        .catch( error => this.handleError(error, res) );
    }
}
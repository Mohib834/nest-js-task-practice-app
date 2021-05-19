import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    try {
      const user = this.create();
      user.username = username;
      user.password = password;

      await this.save(user);
    } catch (err) {
      console.log('code', err.code);

      if (err.code === '23505') {
        throw new ConflictException('Username already exist!');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}

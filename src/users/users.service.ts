import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // gen salt
    const salt = await bcrypt.genSalt();

    // enc password
    const encPassword = await bcrypt.hash(createUserDto.password, salt);

    // replace password with encPassword
    const userWithEncPassword = { ...createUserDto, password: encPassword };

    // saved
    const savedUser = await this.userRepository.save(userWithEncPassword);

    // spread password filed from savedUser
    const { password, ...userWithoutPassword } = savedUser;

    // return user without password filed
    return userWithoutPassword;
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.save({
      id,
      ...updateUserDto,
    });
  }

  remove(id: number) {
    return this.userRepository.delete({ id });
  }
  async findOneByUsername(username: string): Promise<User> {
    if (!username) {
      return null;
    }
    return this.userRepository.findOneBy({ username });
  }
}

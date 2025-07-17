import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(data: CreateUserDto): Promise<User> {
    const user = this.userRepo.create(data);
    return this.userRepo.save(user);
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepo.findOne({ where: { email } });
    return user ?? undefined;
  }

  async findById(id: number): Promise<User | undefined> {
    const user = await this.userRepo.findOne({ where: { id } });
    return user ?? undefined;
  }
  findAll(): Promise<User[]> {
    return this.userRepo.find();
  }
}

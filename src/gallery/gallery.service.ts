import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './photo.entity';

@Injectable()
export class GalleryService {
  constructor(@InjectRepository(Photo) private repo: Repository<Photo>) {}

  findAll() {
    return this.repo.find();
  }
}
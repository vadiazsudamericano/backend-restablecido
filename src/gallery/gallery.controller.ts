import { Controller, Get, UseGuards } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly service: GalleryService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAllPhotos() {
    return this.service.findAll();
  }
}
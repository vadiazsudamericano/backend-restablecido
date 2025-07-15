import { Test, TestingModule } from '@nestjs/testing';
import { RegistroHerramientaController } from './registro-herramienta.controller';

describe('RegistroHerramientaController', () => {
  let controller: RegistroHerramientaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegistroHerramientaController],
    }).compile();

    controller = module.get<RegistroHerramientaController>(RegistroHerramientaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

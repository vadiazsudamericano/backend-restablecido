import { Test, TestingModule } from '@nestjs/testing';
import { RegistroHerramientaService } from './registro-herramienta.service';

describe('RegistroHerramientaService', () => {
  let service: RegistroHerramientaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegistroHerramientaService],
    }).compile();

    service = module.get<RegistroHerramientaService>(RegistroHerramientaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

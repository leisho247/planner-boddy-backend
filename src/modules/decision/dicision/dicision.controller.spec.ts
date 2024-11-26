import { Test, TestingModule } from '@nestjs/testing';
import { DicisionController } from './dicision.controller';

describe('DicisionController', () => {
  let controller: DicisionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DicisionController],
    }).compile();

    controller = module.get<DicisionController>(DicisionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

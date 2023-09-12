import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateEchoDto } from './dto/create-echo.dto';
import { UpdateEchoDto } from './dto/update-echo.dto';
import { Echo } from './entities/echo.entity';

@Injectable()
export class EchoService {
  Echos = [] as Echo[];

  create(createEchoDto: CreateEchoDto) {
    const echo = new Echo();
    echo._id = uuidv4();
    echo.message = createEchoDto.message;
    echo.author = createEchoDto.author;
    echo.date = new Date();
    this.Echos.push(echo);
    return echo;
  }

  findAll() {
    return this.Echos;
  }

  findOne(id: string) {
    return this.Echos.find((echo) => echo._id === id);
  }

  update(id: string, updateEchoDto: UpdateEchoDto) {
    const index = this.Echos.findIndex((echo) => echo._id === id);
    this.Echos[index] = { ...this.Echos[index], ...updateEchoDto };
    return this.Echos[index];
  }

  remove(id: string) {
    const index = this.Echos.findIndex((echo) => echo._id === id);
    this.Echos.splice(index, 1);
    return this.Echos;
  }
}

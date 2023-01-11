import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { EventsEnum } from '../../components/subscribers/enum/events.enum';

@Injectable()
export class SubscribeHttpService {
  constructor(private httpService: HttpService) {}

  async sendEvents(
    url: string,
    body: { task: string; event: EventsEnum },
  ): Promise<AxiosResponse> {
    try {
      const result = await firstValueFrom(
        this.httpService.post(`${url}/subscribe`, { ...body }),
      );
      return result.data || {};
    } catch (e) {
      throw new BadRequestException('Invalid url');
    }
  }
}

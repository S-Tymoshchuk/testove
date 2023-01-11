import { Body, Controller, Post } from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { SUBSCRIBE_PATH } from '../../docs/path';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SUBSCRIBE_TAG } from '../../docs/tags';
import { CreateSubscribeRequest } from './dto/request/create-subscribe-request';
import { GeneralResponse } from '../../utils/decorators/general-response';

@ApiTags(SUBSCRIBE_TAG)
@Controller(SUBSCRIBE_PATH)
export class SubscribersController {
  constructor(private readonly subscribeService: SubscribersService) {}

  @ApiOkResponse({ type: GeneralResponse })
  @Post()
  createSubscribe(
    @Body() body: CreateSubscribeRequest,
  ): Promise<{ success: boolean }> {
    return this.subscribeService.createSubscribe(body);
  }
}

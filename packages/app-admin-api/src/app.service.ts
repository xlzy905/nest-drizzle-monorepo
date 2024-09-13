import { Injectable, Inject } from '@nestjs/common'
import type { DbClient } from '@ws/db'
import { schema } from '@ws/db'

@Injectable()
export class AppService {
  constructor(@Inject('DB') private db: DbClient) {}

  getHello(): string {
    return 'Hello World!'
  }

  async getFirstUserName(): Promise<string> {
    try {
      const result = await this.db.select().from(schema.users).limit(1)
      return result[0].fullName
    } catch (error) {
      console.log(error)
    }
  }
}

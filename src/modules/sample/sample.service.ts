import { PrismaClient } from "../../generated/prisma/client.js";
import { ApiError } from "../../utils/api-error.js";
import { RedisService } from "../redis/redis.service.js";

export class SampleService {
  constructor(
    private prisma: PrismaClient,
    private redisService: RedisService,
  ) {}

  getSamples = async () => {
    const cacheSample = await this.redisService.getValue("samples");

    if(cacheSample){
      console.log("INI DATA SAMPLE DARI REDIS")
      return JSON.parse(cacheSample);
    }
    const samples = await this.prisma.sample.findMany();

    await this.redisService.setValue("sample", JSON.stringify(samples), 30);
    console.log("INI DATA SAMPLE DARI DATABASE")
    return samples;
  };

  getSample = async (id: number) => {
    const sample = await this.prisma.sample.findUnique({
      where: { id },
    });

    if (!sample) {
      throw new ApiError("sample not found", 404);
    }

    return sample;
  };
}

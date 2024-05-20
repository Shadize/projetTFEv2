import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ApiCodeResponse } from '@common/api/api-code.response';
export declare class ApiInterceptor implements NestInterceptor {
    private readonly logger;
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    map(path: String): ApiCodeResponse;
}

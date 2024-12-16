import { PaginatedListRequest } from '@patterson-angular/types';
import { Observable } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUsersRepositoryService {
  createUser<T>(userId: string): Observable<T>;
}

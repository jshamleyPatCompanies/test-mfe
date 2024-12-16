import { LogLevel } from '@patterson-angular/logger';
import { BusinessActionBase } from './business-action-base';

/**
 * Use this action to perform business logic with validation and business rules.
 */
export class CreateUserAction<T> extends BusinessActionBase<T> {
  userId!: string;

  constructor(userId: string) {
    super('CreateUserAction');

    this.userId = userId;
  }

  /**
   * Use the [preValidateAction] to add any business or validation rules that
   * are required to pass in order to perform the action.
   *
   * Use the [ValidationContext] item of the action to add rules. The ValidationContext
   * uses a Fluent API to allow for chained rules to be configured.
   */
  override preValidateAction() {
    //TODO: ADD REQUIRED VALIDATION TO THE ACTION
  }

  /**
   * Use the [performAction] operation to execute the target of the action's business logic. This
   * will only run if the rules and validations are successful.
   */
  override performAction() {
    this.loggingService.log(
      this.actionName,
      LogLevel.Information,
      `Preparing to call API to complete action.`
    );
    this.response = this.businessProvider.repositoryService.createUser<T>(
      this.userId
    );
  }
}

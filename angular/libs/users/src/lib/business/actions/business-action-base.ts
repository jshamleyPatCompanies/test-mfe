import { ActionBase } from '@patterson-angular/foundation';
import { UsersBusinessProviderService } from './../users-business-provider.service';

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
export abstract class BusinessActionBase<T> extends ActionBase<T> {
  showRuleMessages = true;
  hideRuleMessages = false;
  businessProvider!: UsersBusinessProviderService;

  constructor(actionName: string) {
    super();
    this.actionName = actionName;
  }

  /**
   * Use the [Do] method to perform the action. Also uses [inversion of control]
   * and provides the action the same instance of the [service context] and
   * [logging service].
   */
  Do(businessProvider: UsersBusinessProviderService) {
    this.businessProvider = businessProvider;
    this.serviceContext = businessProvider.serviceContext;
    this.loggingService = businessProvider.loggingService;

    this.execute();
  }
}

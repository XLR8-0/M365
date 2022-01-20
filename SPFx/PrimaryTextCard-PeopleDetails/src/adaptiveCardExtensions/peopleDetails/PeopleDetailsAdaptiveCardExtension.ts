import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { PeopleDetailsPropertyPane } from './PeopleDetailsPropertyPane';

export interface IPeopleDetailsAdaptiveCardExtensionProps {
  title: string;
  description: string;
  iconProperty: string;
}

export interface IPeopleDetailsAdaptiveCardExtensionState {
  description: string;
}

const CARD_VIEW_REGISTRY_ID: string = 'PeopleDetails_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'PeopleDetails_QUICK_VIEW';

export default class PeopleDetailsAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IPeopleDetailsAdaptiveCardExtensionProps,
  IPeopleDetailsAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: PeopleDetailsPropertyPane | undefined;

  public onInit(): Promise<void> {
    this.state = {
      description: this.properties.description
    };

    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());

    return Promise.resolve();
  }

  public get title(): string {
    return this.properties.title;
  }

  protected get iconProperty(): string {
    return this.properties.iconProperty || require('./assets/SharePointLogo.svg');
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'PeopleDetails-property-pane'*/
      './PeopleDetailsPropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.PeopleDetailsPropertyPane();
        }
      );
  }

  protected renderCard(): string | undefined {
    return CARD_VIEW_REGISTRY_ID;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return this._deferredPropertyPane!.getPropertyPaneConfiguration();
  }
}

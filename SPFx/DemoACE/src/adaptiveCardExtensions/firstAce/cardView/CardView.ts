import {
  BasePrimaryTextCardView,
  IPrimaryTextCardParameters,
  IExternalLinkCardAction,
  IQuickViewCardAction,
  ICardButton
} from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'FirstAceAdaptiveCardExtensionStrings';
import { IFirstAceAdaptiveCardExtensionProps, IFirstAceAdaptiveCardExtensionState, QUICK_VIEW_REGISTRY_ID } from '../FirstAceAdaptiveCardExtension';

export class CardView extends BasePrimaryTextCardView<IFirstAceAdaptiveCardExtensionProps, IFirstAceAdaptiveCardExtensionState> {
  public get cardButtons(): [ICardButton] | [ICardButton, ICardButton] | undefined {
    return [
      {
        title: strings.QuickViewButton,
        action: {
          type: 'QuickView',
          parameters: {
            view: QUICK_VIEW_REGISTRY_ID
          }
        }
      }
    ];
  }

  public get data(): IPrimaryTextCardParameters {
    return {
      primaryText: strings.PrimaryText,
      description: this.properties.description
    };
  }

  public get onCardSelection(): IQuickViewCardAction | IExternalLinkCardAction | undefined {
    return {
      type: 'ExternalLink',
      parameters: {
        //target: 'https://www.bing.com'
        target: "https://teams.microsoft.com/l/entity/6f72ba9c-ad9f-4c62-b48c-b652f2b30614/0",
        isTeamsDeepLink: true
      }
    };
  }
}

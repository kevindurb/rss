import Element from '../utils/Element.js';
import { makeButton } from '../elements/Button.js';
import { makeModal, linkModalAndButton } from '../elements/Modal.js';

class ManageFeedsModal extends Element {
  init(container) {
    this.feedsService = container.get('feedsService');
  }

  mount() {
    const manageFeedsButton = makeButton({
      text: 'Manage Feeds',
    });
    const modal = makeModal({
      id: 'ManageFeedsModal',
      headerText: 'Manage Feeds',
    });

    linkModalAndButton(modal, manageFeedsButton);

    this.appendChild(manageFeedsButton);
    this.appendChild(modal);
  }
}

customElements.define('x-manage-feeds-modal', ManageFeedsModal);

export default ManageFeedsModal;

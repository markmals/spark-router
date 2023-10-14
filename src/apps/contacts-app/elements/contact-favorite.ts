import type { FetcherWithDirective } from '@campfirejs/router';
import { Router } from '@campfirejs/router';
import { WatchedElement } from '@campfirejs/signals';
import { css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { sharedStyles } from '~/styles/styles';

@customElement('contact-favorite')
export class ContactFavoriteElement extends WatchedElement {
    static styles = [
        sharedStyles,
        css`
            :host form button {
                box-shadow: none;
                font-size: 1.5rem;
                font-weight: 400;
                padding: 0;
            }

            :host form button[value='true'] {
                color: #a4a4a4;
            }

            :host form button[value='true']:hover,
            :host form button[value='false'] {
                color: #eeb004;
            }
        `,
    ];

    @property({ attribute: false })
    @state()
    accessor favorite!: boolean;

    #router = new Router(this);
    #fetcher!: FetcherWithDirective<unknown>;

    connectedCallback() {
        super.connectedCallback();
        this.#fetcher = this.#router.getFetcher();
    }

    get #favorite() {
        if (this.#fetcher.formData) {
            return this.#fetcher.formData.get('favorite') === 'true';
        }

        return this.favorite;
    }

    render() {
        return html`
            <form method="post" ${this.#fetcher.enhanceForm()}>
                <button
                    aria-label="${this.#favorite ? 'Remove from favorites' : 'Add to favorites'}"
                    name="favorite"
                    value="${this.#favorite ? 'false' : 'true'}"
                >
                    ${this.#favorite ? '★' : '☆'}
                </button>
            </form>
        `;
    }
}
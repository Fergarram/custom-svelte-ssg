<script>
    import { setContext } from 'svelte';
    import { makeid } from '../scripts/utils';

    let stackId = makeid(8);
    let cardStack = [];

    setContext('cardStack', {
        addCard: (id) => {
            cardStack = [...cardStack, id];
            return cardStack.length - 1;
        },
        getStack: () => {
            return cardStack;
        },
        moveCard: (id) => {
            const index = cardStack.indexOf(id);
            cardStack.splice(index, 1);
            cardStack = [...cardStack, id];
            if (typeof window !== 'undefined') {
                window.dispatchEvent(new Event(`cardmoved:${stackId}`));
            }
        },
        addListener: (listener) => {
            if (typeof window !== 'undefined') {
                window.addEventListener(`cardmoved:${stackId}`, listener);
            }
        },
        removeListener: (listener) => {
            if (typeof window !== 'undefined') {
                window.removeEventListener(`cardmoved:${stackId}`, listener);
            }
        }
    });
</script>

<slot></slot>
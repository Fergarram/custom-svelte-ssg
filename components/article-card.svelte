<style src="../styles/article-card.scss"></style>

<script>
    import { onMount, onDestroy, getContext } from 'svelte';
    import { makeid } from '../scripts/utils';

    export let x = 0;
    export let y = 0;
    export let domId;
    export let width;
    export let height;
    export let title;
    export let close;
    export let resizable = true;
    export let frameless = false;

    let card;
    let cardId = makeid(8);
    let handleCardDrag;
    let isDragging = false;
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const { addCard, moveCard, addListener, removeListener, getStack } = getContext('cardStack');

    const setPointerEventsFor = (element, option) => {
        element.style.pointerEvents = option;
    };

    const dragMouseDown = (e) => {
        pos3 = e.clientX;
        pos4 = e.clientY;
        let isDraggable = e.target.getAttribute('draggable');
        isDraggable = isDraggable === 'false' ? false : isDraggable !== null;
        moveCard(cardId);

        document.onmousemove = (e) => {
            if (isDraggable) {
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                let rect = card.getBoundingClientRect();
                card.style.transform = `translate3d(${(rect.left - pos1)}px, ${(rect.top - pos2)}px, 0)`;
                isDragging = true;
                setPointerEventsFor(card, 'none');
            }
        }

        document.onmouseup = (e) => {
            isDragging = false;
            setPointerEventsFor(card, 'initial');
            document.onmousemove = null;
            document.onmouseup = null;
        }
    }

    onMount(() => {
        let cardIndex = addCard(cardId);
        card.style.zIndex = 100 + cardIndex;

        handleCardDrag = () => {
            cardIndex = getStack().indexOf(cardId);
            card.style.zIndex = 100 + cardIndex;
        };

        addListener(handleCardDrag);
    });

    onDestroy(() => {
        removeListener(handleCardDrag);
    });
</script>

<article
    id={domId}
    tabindex="0"
    key={cardId}
    aria-label={`${title}`}
    bind:this={card}
    class="card"
    class:frameless
    style="transform: translate3d({x}px, {y}px, 0);"
    on:mousedown={dragMouseDown}
    on:focus={() => moveCard(cardId)}
>
    {#if !frameless}
        <div class="title-bar" draggable>
            <span aria-hidden="true" draggable>{title}</span>
            <button
                class="close-button"
                on:click={close}
                aria-label="Hide article">
            </button>
        </div>
    {/if}
    <div
        draggable={frameless}
        class:resizable
        class="content"
        style="width: {width}px; height: {height}px;"
    >
        <slot></slot>
    </div>
</article>
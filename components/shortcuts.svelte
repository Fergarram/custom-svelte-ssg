<script>
    import shortcuts from '../data/shortcuts.json'

    export let click = e => e.preventDefault();

    let isHovering = false;
    let noClicks = 0;

    const handleClick = (e) => {
        if (isHovering && noClicks === 1) {
            click(e);
            noClicks = 0;
        } else if (isHovering) {
            e.preventDefault();
            noClicks += 1;
            setTimeout(() => noClicks = 0, 250);
        } else if (!isHovering) {
            click(e);
        }
    };
</script>

<nav id="main-navigation">
    <ul>
        {#each shortcuts as shortcut, i}
            <li>
                <a
                    href={`/${shortcut.route}`}
                    on:click={handleClick}
                    on:mouseover={() => isHovering = true}
                    on:mouseout={() => isHovering = false}
                    data-label={shortcut.label}
                >
                    <img
                        draggable="false"
                        src={`../assets/icons/${shortcut.icon}.png`}
                        alt=""
                    />
                    <span>{shortcut.label}</span>
                </a>
            </li>
        {/each}
    </ul>
</nav>

<style lang="scss">
    @import '../styles/variables.scss';

    ul {
        position: absolute;
        display: flex;
        flex-wrap: wrap;
        width: 200px;
        list-style: none;
        margin: 20px 16px;
    }

    a {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 90px;
        padding: 4px 6px;
        margin-bottom: 25px;
        margin-right: 10px;
        outline: none;
        border: none;
        border-radius: 4px;
        text-decoration: none;
        background-color: transparent;
        user-select: none;
        cursor: default;

        &:focus {
            background-color: rgba(255, 255, 255, 0.1);
        }
    }

    img {
        display: block;
        min-width: 48px;
        min-height: 48px;
        image-rendering: pixelated;
        pointer-events: none;
        margin-bottom: 8px;
    }

    span {
        display: block;
        text-align: center;
        font-family: $font-frank;
        font-size: 12px;
        color: white;
        text-shadow: 1px 1px black;
        letter-spacing: 0.5px;
        user-select: none;
        cursor: default;
    }
</style>
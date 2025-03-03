document.addEventListener('DOMContentLoaded', () => {
    const addLayerBtn = document.querySelector('.add-layer-btn');
    const resetLayersBtn = document.querySelector('.reset-layers-btn');
    const seedInput = document.getElementById('seed');
    const randomSeedBtn = document.querySelector('.random-seed-btn');
    const layerList = document.getElementById('layer-list');
    let draggedItem = null;

    // ランダムシード生成ボタンの動作
    randomSeedBtn.addEventListener('click', () => {
        // -2,147,483,648 から 2,147,483,647 の範囲でランダムな整数を生成（Minecraftのシード値範囲）
        const randomSeed = Math.floor(Math.random() * 4294967296) - 2147483648;
        seedInput.value = randomSeed;
    });

    // レイヤーを追加（top-drop-zoneの下に追加）
    addLayerBtn.addEventListener('click', () => {
        const layerItem = document.createElement('div');
        layerItem.classList.add('layer-item');
        layerItem.draggable = true;
        layerItem.innerHTML = `
            <span class="drag-handle"><i class="fas fa-grip-vertical"></i></span>
            <select>
                <option value="stone">Stone</option>
                <option value="dirt">Dirt</option>
                <option value="grass">Grass</option>
            </select>
            <input type="number" placeholder="Height" min="1" value="1">
            <button class="delete-layer-btn"><i class="fas fa-trash"></i></button>
        `;
        const topDropZone = layerList.querySelector('.top-drop-zone');
        topDropZone.after(layerItem);

        // 削除ボタンのイベントリスナー
        layerItem.querySelector('.delete-layer-btn').addEventListener('click', () => {
            layerItem.remove();
        });
    });

    // すべてのレイヤーをリセット
    resetLayersBtn.addEventListener('click', () => {
        const topDropZone = layerList.querySelector('.top-drop-zone');
        layerList.innerHTML = '';
        layerList.appendChild(topDropZone);
    });

    // ドラッグ＆ドロップの処理
    layerList.addEventListener('dragstart', (e) => {
        draggedItem = e.target.closest('.layer-item');
        if (draggedItem) {
            draggedItem.classList.add('dragging');
        }
    });

    layerList.addEventListener('dragend', () => {
        if (draggedItem) {
            draggedItem.classList.remove('dragging');
            draggedItem = null;
        }
        document.querySelectorAll('.layer-item, .top-drop-zone').forEach(item => {
            item.classList.remove('drop-target-before', 'drop-target-after', 'drop-target');
        });
    });

    layerList.addEventListener('dragover', (e) => {
        e.preventDefault();
        const allItems = [...layerList.querySelectorAll('.layer-item:not(.dragging)')];
        const topDropZone = layerList.querySelector('.top-drop-zone');
        const mouseY = e.clientY;

        // すべてのドロップターゲットをクリア
        allItems.forEach(item => {
            item.classList.remove('drop-target-before', 'drop-target-after');
        });
        topDropZone.classList.remove('drop-target');

        // top-drop-zoneをチェック
        const topRect = topDropZone.getBoundingClientRect();
        if (mouseY >= topRect.top && mouseY <= topRect.bottom) {
            topDropZone.classList.add('drop-target');
            return;
        }

        // その他のレイヤーをチェック
        let dropTarget = null;
        let isBefore = false;

        for (const item of allItems) {
            const rect = item.getBoundingClientRect();
            const midPoint = rect.top + (rect.height / 2);

            if (mouseY >= rect.top && mouseY <= rect.bottom) {
                dropTarget = item;
                isBefore = mouseY < midPoint;
                break;
            }
        }

        // 一番下にドロップする場合
        if (!dropTarget && allItems.length && mouseY > allItems[allItems.length - 1].getBoundingClientRect().bottom) {
            dropTarget = allItems[allItems.length - 1];
            isBefore = false;
        }

        if (dropTarget) {
            if (isBefore) {
                dropTarget.classList.add('drop-target-before');
            } else {
                dropTarget.classList.add('drop-target-after');
            }
        }
    });

    layerList.addEventListener('dragleave', (e) => {
        const dropTarget = e.target.closest('.layer-item, .top-drop-zone');
        if (dropTarget && dropTarget !== draggedItem) {
            dropTarget.classList.remove('drop-target-before', 'drop-target-after', 'drop-target');
        }
    });

    layerList.addEventListener('drop', (e) => {
        e.preventDefault();
        const allItems = [...layerList.querySelectorAll('.layer-item:not(.dragging)')];
        const topDropZone = layerList.querySelector('.top-drop-zone');
        const mouseY = e.clientY;

        // すべてのドロップターゲットをクリア
        allItems.forEach(item => {
            item.classList.remove('drop-target-before', 'drop-target-after');
        });
        topDropZone.classList.remove('drop-target');

        // top-drop-zoneへのドロップ
        const topRect = topDropZone.getBoundingClientRect();
        if (mouseY >= topRect.top && mouseY <= topRect.bottom) {
            topDropZone.after(draggedItem);
            return;
        }

        // その他のレイヤーへのドロップ
        let dropTarget = null;
        let isBefore = false;

        for (const item of allItems) {
            const rect = item.getBoundingClientRect();
            const midPoint = rect.top + (rect.height / 2);

            if (mouseY >= rect.top && mouseY <= rect.bottom) {
                dropTarget = item;
                isBefore = mouseY < midPoint;
                break;
            }
        }

        if (!dropTarget && allItems.length && mouseY > allItems[allItems.length - 1].getBoundingClientRect().bottom) {
            dropTarget = allItems[allItems.length - 1];
            isBefore = false;
        }

        if (dropTarget) {
            if (isBefore) {
                dropTarget.before(draggedItem);
            } else {
                dropTarget.after(draggedItem);
            }
        }
    });
});
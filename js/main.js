document.addEventListener('DOMContentLoaded', () => {
    const addLayerBtn = document.querySelector('.add-layer-btn');
    const resetLayersBtn = document.querySelector('.reset-layers-btn');
    const seedInput = document.getElementById('seed');
    const randomSeedBtn = document.querySelector('.random-seed-btn');
    const downloadBtn = document.querySelector('.download-btn');
    const layerList = document.getElementById('layer-list');
    let draggedItem = null;

    randomSeedBtn.addEventListener('click', () => {
        const randomSeed = Math.floor(Math.random() * 4294967296) - 2147483648;
        seedInput.value = randomSeed;
    });

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

        layerItem.querySelector('.delete-layer-btn').addEventListener('click', () => {
            layerItem.remove();
        });
    });

    resetLayersBtn.addEventListener('click', () => {
        const topDropZone = layerList.querySelector('.top-drop-zone');
        layerList.innerHTML = '';
        layerList.appendChild(topDropZone);
    });

    downloadBtn.addEventListener('click', () => {
        const worldName = document.getElementById('world-name').value || 'Flat World';
        const seed = seedInput.value || 'Random Seed';
        const biome = document.getElementById('biome').value;
        const layers = Array.from(layerList.querySelectorAll('.layer-item')).map(item => {
            return {
                block: item.querySelector('select').value,
                height: parseInt(item.querySelector('input').value) || 1
            };
        });

        const config = {
            worldName: worldName,
            seed: seed,
            biome: biome,
            layers: layers
        };

        const jsonString = JSON.stringify(config, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${worldName || 'flat_world'}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

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

        allItems.forEach(item => {
            item.classList.remove('drop-target-before', 'drop-target-after');
        });
        topDropZone.classList.remove('drop-target');

        const topRect = topDropZone.getBoundingClientRect();
        if (mouseY >= topRect.top && mouseY <= topRect.bottom) {
            topDropZone.classList.add('drop-target');
            return;
        }

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

        allItems.forEach(item => {
            item.classList.remove('drop-target-before', 'drop-target-after');
        });
        topDropZone.classList.remove('drop-target');

        const topRect = topDropZone.getBoundingClientRect();
        if (mouseY >= topRect.top && mouseY <= topRect.bottom) {
            topDropZone.after(draggedItem);
            return;
        }

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
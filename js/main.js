document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.querySelector('.toggle-btn');
    const sidebar = document.querySelector('.sidebar');
    const closeBtn = document.querySelector('.close-btn');

    // サイドバーを開く
    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open'); // サイドバーを開閉
        toggleBtn.style.display = 'none'; // ボタンを非表示
    });

    // サイドバーを閉じる
    closeBtn.addEventListener('click', () => {
        sidebar.classList.remove('open'); // サイドバーを開閉
        toggleBtn.style.display = 'flex'; // ボタンを表示
    });
});
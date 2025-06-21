const link = document.querySelector("input");
const btn  = document.querySelector("button");

btn.addEventListener('click', () => {
    makeQR(link.value);
});

const Base_url = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=";

function makeQR(link) {
    // Remove previous container if exists
    const prevContainer = document.querySelector('#qrContainer');
    if (prevContainer) prevContainer.remove();

    // Create container div with Tailwind classes
    const container = document.createElement('div');
    container.id = 'qrContainer';
    container.classList.add(
        'mt-4',            // margin top
        'flex',            // flex container
        'flex-col',        // vertical stacking
        'items-center',    // center horizontally
        'gap-2'            // spacing between children
    );

    // Create anchor and image
    const ancTag = document.createElement('a');
    const imgTag = document.createElement('img');

    ancTag.appendChild(imgTag);
    imgTag.src = Base_url + encodeURIComponent(link);
    imgTag.alt = "QR Code";

    container.appendChild(ancTag);

    // Create download button with Tailwind classes
    const downloadBtn = document.createElement('button');
    downloadBtn.textContent = "Download QR Code";

    downloadBtn.classList.add(
        'bg-blue-500', 'text-white', 'px-6', 'py-2', 'rounded',
        'hover:bg-red-600', 'transition', 'hover:scale-110',
        'downloadBtn', 'cursor-pointer'
    );

    container.appendChild(downloadBtn);

    // Insert container after submit button
    btn.insertAdjacentElement('afterend', container);

    // Download button click event
    downloadBtn.addEventListener('click', () => {
        const a = document.createElement('a');
        a.href = imgTag.src;
        a.download = 'qr-code.png';
        document.body.appendChild(a);
        a.click();
        a.remove();
    });
}

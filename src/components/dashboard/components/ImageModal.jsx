function ImageModal({ src, toggleModal }) {
    // hide modal event handler
    const hideModal = (e) => {
        if (e.target.id === 'imageModal' || e.target.id === "imageDiv") {
            toggleModal(false);
            return;
        }
    };
    return (
        <>
            <div
                id="imageModal"
                className="open-modal w-full h-full fixed top-0 left-0 z-50 bg-slate-800 bg-opacity-40 flex items-center justify-center backdrop-box"
                onClick={hideModal}
            >
                <div id="imageDiv" className="w-11/12 lg:w-9/12 xl:w-2/4 h-5/6 flex items-center justify-center m-auto">
                    <img
                        src={src}
                        alt=""
                        className=" w-auto min-h-96 h-auto max-h-96 rounded-3xl object-contain"
                    />
                </div>
            </div>
        </>
    );
}
export default ImageModal;
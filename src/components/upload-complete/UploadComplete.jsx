import './UploadComplete.css'

const UploadComplete = ({link, onClickCopyLink}) => {

    return (
            <section className="success">
                <img className="success__icon" src="/success.png" width="42" height="42" alt="success-icon"/>
                <p className="success__title">Uploaded Successfully!</p>
                <img className="success__img" src={link} width="338px" height="224px" alt="uploaded"/>
                <div className="success__form">
                    <span className="success__link">{link}</span>
                    <button className="success__button"
                            onClick={() => onClickCopyLink(link)}>Copy Link</button>
                </div>
            </section>

    );
};
export default UploadComplete
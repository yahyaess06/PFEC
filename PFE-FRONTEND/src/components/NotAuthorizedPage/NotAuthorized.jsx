import "./NotAuthorized.css";
import { FaUserMd, FaLock } from "react-icons/fa";

export default function NotAuthorized() {
    return (
        <div className="na-container">

            <div className="na-card">

                <div className="na-icon">
                    <FaLock />
                </div>

                <h1 className="na-code">403</h1>

                <h2 className="na-title">
                    Accès Refusé
                </h2>

                <p className="na-text">
                    Vous n'avez pas l'autorisation d'accéder à cette page.
                    Cette section est réservée au personnel médical autorisé.
                </p>

                <button
                    className="na-btn"
                    onClick={() => window.history.back()}
                >
                    Retour
                </button>

                <div className="na-footer">
                    <FaUserMd /> Système de Gestion Hospitalière
                </div>

            </div>

        </div>
    );
}



// export default function NotAuthorized() {
//     return (
//         <div style={{textAlign:"center",marginTop:"100px"}}>
//             <h1>403</h1>
//             <h2>Not Authorized</h2>
//             <p>Vous n'avez pas accès à cette page.</p>
//         </div>
//     );
// }
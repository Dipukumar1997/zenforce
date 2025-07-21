// backend/middleware/checkAccess.js
// This middleware assumes `req.user` is populated by your authentication middleware (e.g., userAuth)
export const checkNotesAccess = (requiredLevel) => (req, res, next) => {
    if (!req.user) {
        console.log("cheking in checknoteaccess "+ req)
        return res.status(401).json({ message: 'Unauthorized: No user found in request.' });
    }
    const userAccessLevel = req.user.notesAccessLevel;
    const accessHierarchy = {
        'none': 0,
        'view': 1,
        'full': 2
    };
    if (accessHierarchy[userAccessLevel] === undefined) {
        // Handle cases where notesAccessLevel might be missing or invalid
        return res.status(403).json({ message: 'Forbidden: Invalid notes access level for user.' });
    }
    if (accessHierarchy[userAccessLevel] >= accessHierarchy[requiredLevel]) {
        next(); // User has sufficient access
    } else {
        res.status(403).json({ message: 'Forbidden: Insufficient notes access level to perform this action.' });
    }
};
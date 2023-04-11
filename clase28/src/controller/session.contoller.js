
export const getCurrentUser =   (req, res) => {
    res.json({ data: req.user });
  }
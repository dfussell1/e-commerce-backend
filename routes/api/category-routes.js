const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
    try {
      const categories = await Category.findAll({
        include: [{ model: Product }],
      });

      res.status(200).json(categories);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
      const category = await Category.findByPk(req.params.id, {
        include: [{ model: Product }],
      });

      if(!category) {
        res.status(400).json({ message: 'No category with that ID!'});
        return;
      };

      res.status(200).json(category);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
      const newCategory = await Category.create({
        category_name: req.body.category_name,
      });

      res.status(200).json(newCategory);
    } catch (err) {
      res.status(400).json(err);
    }
});

router.put('/:id', async (req, res) => {
  try {
    const updateCategory = await Category.update({
      category_name: req.body.category_name,
    }, {
      where: {
        id: req.params.id,
      },
    });

    if (!updateCategory) {
      res.status(400).json({ message: 'No category with that ID!'});
      return;
    };

    res.status(200).json(updateCategory)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
    try {
      const deleteCategory = await Category.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!deleteCategory) {
        res.status(400).json({ message: 'No category with that ID!'});
        return;
      };
  
      res.status(200).json(deleteCategory);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;

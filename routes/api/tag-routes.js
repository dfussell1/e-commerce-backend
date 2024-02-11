const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
    try {
      const tags = await Tag.findAll({
        include: [{ model: Product, through: ProductTag }],
      });

      res.status(200).json(tags);
    } catch (err) {
      res.status(500).json(err);  
    }
});

router.get('/:id', async (req, res) => {
    try {
      const tag  = await Tag.findByPk(req.params.id, {
        include: [{ model: Product, through: ProductTag }],
      });

      if (!tag) {
        res.status(400).json({ message: 'No tag with that ID!'});
        return;
      };

      res.status(200).json(tag);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
      const newTag = await Tag.create({
        tag_name: req.body.tag_name,
      });

      res.status(200).json(newTag);
    } catch (err) {
      res.status(400).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
      const updateTag = await Tag.update({
        tag_name: req.body.tag_name,
      }, {
        where: {
          id: req.params.id,
        },
      });

      if (!updateTag) {
        res.status(400).json({ message: 'No tag with that ID!'});
        return;
      };

      res.status(200).json(updateTag);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
      const deleteTag = await Tag.destroy({
        where: {
          id: req.params.id,
        },
      });

      if (!deleteTag) {
        res.status(400).json('No tag with that ID!');
        return;
      };

      res.status(200).json(deleteTag);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;

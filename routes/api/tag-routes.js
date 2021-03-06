const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    // find all tags
    const tags = await Tag.findAll({
      // be sure to include its associated Product data
      include: [{
        model: Product
      }]
    });
    
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    // find a single tag by its `id`
    const tag = await Tag.findByPk(req.params.id, {
      // be sure to include its associated Product data
      include: [{
        model: Product
      }]
    });
    
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    // create a new tag
    const tag = await Tag.create(req.body);
    const fullTag = await Tag.findByPk(tag.id, {
      include: [{
        model: Product
      }]
    });
    res.status(200).json(fullTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    // update a tag's name by its `id` value
    const tag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    const fullTag = await Tag.findByPk(req.params.id, {
      include: [{
        model: Product
      }]
    });
    res.status(200).json(fullTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // delete on tag by its `id` value
    const result = await Tag.destroy({ where: { id: req.params.id } });
    if (result)
      res.status(200).json(`Deleted id ${req.params.id} from the database`);
    else
      res.status(200).json(`Nothing to delete`);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

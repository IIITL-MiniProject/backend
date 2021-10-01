const Flat = require('../../db/models/Flat');
const router = require('express').Router();

router.get('/',async (req,res,next)=>{
    if(Object.keys(req.query).length !== 0) {next();return;}
    try{
        const flats = await Flat.getAllFlats();
        res.status(200).send({flats});
    }
    catch(e){
        res.status(400).send({e})
    }
})

router.get("/:id",async (req,res,next)=>{
    // if(Object.keys(req.query).length !== 0) next();
    const id = req.params.id;
    try{
        const flat = await Flat.getFlat(id);
        res.status(200).send({flat});
    }
    catch(e){
        res.status(400).send();
    }

})

router.get('/',async (req,res)=>{

    const allowedQuery = ['size','city'];
    const updates = Object.keys(req.query);
    const isValidOperation = updates.every((update)=>allowedQuery.includes(update));

    let amount=20000000;
    if(req.query.amount) amount=req.query.amount;
    const query = {};
    updates.forEach((update)=>query[update] = req.query[update]);
    
    try{
        const flat = await Flat.find(query).limit(20).where('amount').lte(amount).sort({amount:1}).populate('contact');
        res.status(200).send(flat);
    }
    catch(e){
        res.status(400).send();
    }
})

router.post('/add',async (req,res)=>{
    const flat = new Flat(req.body);

    try{
        const result = await flat.save();
        res.status(201).send({result});
    }
    catch(e)
    {
        res.status(400).send();
    }
})

router.patch('/:id',async (req,res)=>{
    const id = req.params.id;
    const updates = Object.keys(req.body)
    try{
        const flat = await Flat.findById(id);
        if(!flat) {res.status(404).send();return;}
        const allowedUpdate = ['discription','amount','occupied'];
        const isValidOperation = updates.every((update)=>allowedUpdate.includes(update));

        if(!isValidOperation) {res.status(400).send();return;};

        updates.forEach((update)=>flat[update] = req.body[update]);
        const result = await flat.save();
        res.send(result);
    }
    catch(e)
    {
        console.log(e);
        res.status(400).send(e);
    }
})

router.delete('/:id',async (req,res)=>{
    const id = req.params.id;
    try{
        const flat = await Flat.findOneAndDelete({_id:id});
        if(!flat) {
            res.status(404).send();
            return;
        }
        res.status(200).send(flat);
    }
    catch(e){
        res.status(400).send();
    }
})

module.exports = router
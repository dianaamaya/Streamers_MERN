import StreamerModel from '../models/Streamer.js'

export const getStreamers = async (req, res) => {
    try{
        const streamers = await StreamerModel.find();
        res.status(200).json(streamers);        
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            error: "Error getting streamers, please refresh the page or try again later"
        });
    }
}

export const getStreamerById = async (req, res) => {
    try {
        const id = req.params.id;
        const streamer = await StreamerModel.findById(id);
        res.status(200).json(streamer);        
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({error: "server error"});
    }
}

export const createStreamer = async (req, res) => {
    try {
        const { name, platform, description } = req.body;

        let foundStreamer = await StreamerModel.findOne({ name, platform});

        if (foundStreamer) {
            return res.status(403).json({ 
                error: `The streamer already exists with the name '${name}' and platform '${platform}'`
            })
        } else {
            let newStreamer = new StreamerModel({ name, platform, description });
            newStreamer = await newStreamer.save();
    
            res.status(200).json(newStreamer);
        }        

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error: "server error"});
    }
}

export const updateStreamer = async (req, res) => {
    try {
        const { upvote } = req.body;
        const id = req.params.id;

        const streamer = await StreamerModel.findById(id);
        
        if (upvote) {
            streamer.votes.upvotes = streamer.votes.upvotes + 1 
        } else {
            streamer.votes.downvotes = streamer.votes.downvotes + 1 
        }        
        let updatedStreamer = await StreamerModel.findByIdAndUpdate(id, { ...streamer }, {new: true});
        res.status(200).json(updatedStreamer);          

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error: "server error"});
    }
}
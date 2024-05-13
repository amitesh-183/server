const addSong = async (req, res) => {
  try {
    const { title, artist, posterImage, coverImage, userId } = req.body;
    const songUrl = req.file.location; // Assuming req.file.location contains the URL of the uploaded song

    // Create new song
    const newSong = new Song({
      title,
      artist,
      posterImage,
      coverImage,
      songUrl,
      createdBy: userId,
    });
    await newSong.save();
    // Add song reference to user
    await User.findByIdAndUpdate(userId, { $push: { songs: newSong._id } });
    res.status(201).json({ message: "Song created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  addSong,
};

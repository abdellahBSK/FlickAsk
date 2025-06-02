import { Request, Response } from 'express'
import { VideoAskForm } from '../models/VideoAskForm'
import { AuthRequest } from '../types/express'

// controllers/videoAsk.controller.ts
export const createVideoAskForm = async (req: Request, res: Response) => {
  try {
    const { title, description, owner, status, isPublic, settings, tags } =
      req.body

    const videoUrl = req.file ? `/uploads/${req.file.filename}` : null

    const newForm = new VideoAskForm({
      title,
      description,
      // owner,
      status,
      isPublic,
      settings,
      tags,
      videoUrl // <-- save the video path
    })

    await newForm.save()

    res.status(201).json({
      success: true,
      message: 'Video form created successfully',
      data: newForm
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Upload failed',
      error
    })
  }
}

export const getVideoAskForms = async (req: Request, res: Response) => {
  try {
    const videos = await VideoAskForm.find()
    res.status(200).json({ success: true, data: videos })
  } catch (error) {
    console.error('Failed to fetch videos:', error)
    res.status(500).json({ success: false, message: 'Failed to fetch videos' })
  }
}

export const getVideoAskFormById = async (req: AuthRequest, res: Response) => {
  try {
    const formId = req.params.id

    const form = await VideoAskForm.findById(formId).lean()

    if (!form) {
      return res.status(404).json({ success: false, message: 'Form not found' })
    }

    // Check if the video is public or if the user is the owner
    if (form.isPublic) {
      return res
        .status(403)
        .json({ success: false, message: 'This form is private' })
    }

    res.json({ success: true, data: form })
  } catch (error) {
    console.error('Get video form error:', error)
    res.status(500).json({ success: false, message: 'Failed to fetch form' })
  }
}

export const updateVideoAskForm = async (req: Request, res: Response) => {
  try {
    const formId = req.params.id
    const ownerId = req.userId

    const form = await VideoAskForm.findById(formId)

    if (!form) {
      return res.status(404).json({ success: false, message: 'Form not found' })
    }

    // if (!form.owner || form.owner.toString() !== ownerId) {
    //   return res.status(403).json({ success: false, message: 'Not authorized to update this form' });
    // }

    const allowedUpdates = [
      'videoUrl',
      'title',
      'description',
      'status',
      'isPublic',
      'settings.allowAnonymous',
      'settings.requireEmail',
      'settings.notifyOnSubmission',
      'tags'
    ]

    if (!req.body || typeof req.body !== 'object') {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid or missing request body' })
    }

    for (const key of Object.keys(req.body)) {
      if (allowedUpdates.includes(key)) {
        form.set(key, req.body[key])
      }
    }

    if (req.file) {
      form.videoUrl = `/uploads/videos/${req.file.filename}`
    }

    await form.save()

    return res.json({ success: true, data: form })
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : 'Unknown error'
    console.error('Update video form error:', errMsg)
    return res
      .status(500)
      .json({ success: false, message: 'Failed to update form', error: errMsg })
  }
}

export const deleteVideoAskForm = async (req: Request, res: Response) => {
  try {
    const formId = req.params.id
    const ownerId = req.userId

    const form = await VideoAskForm.findById(formId)

    if (!form) {
      return res.status(404).json({ success: false, message: 'Form not found' })
    }

    // Uncomment this if you want to enforce ownership check
    
    // if (!form.owner || form.owner.toString() !== ownerId) {
    //   return res.status(403).json({ success: false, message: 'Not authorized to delete this form' });
    // }

    await form.deleteOne()

    return res.json({ success: true, message: 'Form deleted successfully' })
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : 'Unknown error'
    console.error('Delete video form error:', errMsg)
    return res
      .status(500)
      .json({ success: false, message: 'Failed to delete form', error: errMsg })
  }
}

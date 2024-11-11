'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  ChevronDown,
  Hand,
  LayoutGrid,
  Maximize2,
  Mic,
  MicOff,
  MoreVertical,
  Calendar,
  Check,
  Mail,
  MessageSquare,
  Paperclip,
  PhoneOff,
  Plus,
  Send,
  Settings,
  Share2,
  Smile,
  Users,
  Video as VideoIcon,
  VideoOff,
  ZoomIn,
  ZoomOut,
  MessageCircle,
  PieChart,
  Copy,
  Youtube,
  MonitorPlay,
  Pencil,
  FileText,
  Volume2,
  Volume,
  VolumeX,
  LayoutPanelTop,
  LayoutPanelLeft,
  Grid,
  Computer,
  UserPlus,
  Shield,
  Gauge,
  X,
  Square,
  HeadphonesIcon,
  MenuIcon,
  Pin,
  Videotape,
  ListVideo,
  Signal,
  Radio,
  Film,
  Code,
  SquareSlash,
  GalleryThumbnails,
  Vote,
  ListTodo,
  PictureInPicture,
  MonitorUp,
  Cloud,
  Facebook,
  Twitch,
  Instagram,
  Linkedin,
  AudioLines,
  Speech,
  Video,
  LockKeyhole,
} from "lucide-react"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"

interface InviteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}



type StreamingPlatform = {
  id: string
  name: string
  icon: React.ReactNode
}

const streamingPlatforms: StreamingPlatform[] = [
  { id: "dropbox", name: "Dropbox", icon: <Cloud className="h-4 w-4" /> },
  { id: "facebook", name: "Facebook", icon: <Facebook className="h-4 w-4" /> },
  { id: "youtube", name: "YouTube", icon: <Youtube className="h-4 w-4" /> },
  { id: "twitch", name: "Twitch", icon: <Twitch className="h-4 w-4" /> },
  { id: "instagram", name: "Instagram", icon: <Instagram className="h-4 w-4" /> },
  { id: "linkedin", name: "LinkedIn", icon: <Linkedin className="h-4 w-4" /> },
  { id: "custom-rtmp", name: "Custom RTMP", icon: <Radio className="h-4 w-4" /> },
  { id: "vimeo", name: "Vimeo", icon: <Video className="h-4 w-4" /> },
]



type StreamEntry = {
  id: string
  platform: string
  url: string
}

type Participant = {
  id: string
  name: string
  role: 'Organizer' | 'Moderator' | 'Guest'
  avatar: string
  isMuted: boolean
  isVideoOff: boolean
  isHandRaised: boolean
}

type Message = {
  id: string
  senderId: string
  text: string
  timestamp: Date
}

type Poll = {
  id: string
  question: string
  options: string[]
  votes: Record<string, string[]>
}

type ViewMode = 'stage' | 'verticalFilmstrip' | 'horizontalFilmstrip' | 'tile'



export default function Component({ open, onOpenChange }: InviteDialogProps = { open: false, onOpenChange: () => {} }) {

  const [copied, setCopied] = useState(false)
  const meetingLink = "meethour.io/MHR2409101334722?pcode="
  
  const copyMeetingLink = () => {
    navigator.clipboard.writeText(meetingLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  const [showInviteDialog, setShowInviteDialog] = useState(false)


  const [displayName, setDisplayName] = useState("Akhil Kumar")
  const [email, setEmail] = useState("akhil.kumar@v-empower.com")
  const [language, setLanguage] = useState("en")
  const [deleteCache, setDeleteCache] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [showVoiceCommand, setShowVoiceCommand] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [sidebarContent, setSidebarContent] = useState<'participants' | 'chat' | 'polls' | null>(null)
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [newMessage, setNewMessage] = useState('')
  const [viewMode, setViewMode] = useState<ViewMode>('stage')
  const scrollRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: '2',
      text: 'Hi Akhil. How r u??',
      timestamp: new Date(2024, 0, 1, 14, 30),
    },
    {
      id: '2',
      senderId: '1',
      text: "Hi Shoeb, I'm Gud",
      timestamp: new Date(2024, 0, 1, 14, 31),
    },
    {
      id: '3',
      senderId: '2',
      text: 'Is the wireframes are completed?',
      timestamp: new Date(2024, 0, 1, 14, 32),
    },
    {
      id: '4',
      senderId: '1',
      text: 'Yes almost done, working on components',
      timestamp: new Date(2024, 0, 1, 14, 33),
    },
    {
      id: '5',
      senderId: '2',
      text: 'When can I expect the demo?',
      timestamp: new Date(2024, 0, 1, 14, 34),
    },
  ])
  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: '1',
      name: 'Akhil Kumar',
      role: 'Organizer',
      avatar: '/assets/images/akhil.png',
      isMuted: false,
      isVideoOff: false,
      isHandRaised: false,
    },
    {
      id: '2',
      name: 'Shoeb Ahmad',
      role: 'Moderator',
      avatar: '/assets/images/shoeb.png',
      isMuted: true,
      isVideoOff: false,
      isHandRaised: false,
    },
    {
      id: '3',
      name: 'Muqeet Ahmed',
      role: 'Guest',
      avatar: '/placeholder.svg?height=40&width=40',
      isMuted: false,
      isVideoOff: true,
      isHandRaised: false,
    },
    {
      id: '4',
      name: 'Jaya Chandra',
      role: 'Guest',
      avatar: '/placeholder.svg?height=40&width=40',
      isMuted: true,
      isVideoOff: true,
      isHandRaised: false,
    },
    {
      id: '5',
      name: 'Prasad Kumar',
      role: 'Guest',
      avatar: '/placeholder.svg?height=40&width=40',
      isMuted: false,
      isVideoOff: false,
      isHandRaised: false,
    },
    {
      id: '6',
      name: 'Siva Murthi Naroji',
      role: 'Guest',
      avatar: '/placeholder.svg?height=40&width=40',
      isMuted: true,
      isVideoOff: false,
      isHandRaised: false,
    },
    {
      id: '7',
      name: 'Syam',
      role: 'Guest',
      avatar: '/placeholder.svg?height=40&width=40',
      isMuted: false,
      isVideoOff: true,
      isHandRaised: false,
    },
    {
      id: '8',
      name: 'Padmanabhan',
      role: 'Guest',
      avatar: '/placeholder.svg?height=40&width=40',
      isMuted: true,
      isVideoOff: true,
      isHandRaised: false,
    },
  ])
  const [audioInputs] = useState([
    { id: '1', name: 'Default - Microphone (USB Audio Device)', level: 75 },
    { id: '2', name: 'Communications - Microphone (USB Audio Device)', level: 60 },
    { id: '3', name: 'Microphone (USB Audio Device)', level: 45 },
  ])
  const [audioOutputs] = useState([
    { id: '1', name: 'Default - Speakers (USB Audio Device)' },
    { id: '2', name: 'Communications - Speakers (USB Audio Device)' },
    { id: '3', name: 'Speakers (USB Audio Device)' },
    { id: '4', name: 'Realtek Digital Output (Realtek(R) Audio)' },
  ])
  const [selectedAudioInput, setSelectedAudioInput] = useState(audioInputs[0].id)
  const [selectedAudioOutput, setSelectedAudioOutput] = useState(audioOutputs[0].id)
  const [micVolume, setMicVolume] = useState(75)
  const [speakerVolume, setSpeakerVolume] = useState(50)
  const [newPoll, setNewPoll] = useState({
    question: '',
    options: ['', '']
  })
  const [polls, setPolls] = useState<Poll[]>([])

  const [isHandRaised, setIsHandRaised] = useState(false); // Hand Raise button state
  const [isChatActive, setIsChatActive] = useState(false); // Chat button state
  const [isPollsActive, setIsPollsActive] = useState(false); // Polls button state
  const [isParticipantsActive, setIsParticipantsActive] = useState(false); // Participants button state
  
  const [showLiveStreamDialog, setShowLiveStreamDialog] = useState(false)
  const [showCPConnectDialog, setShowCPConnectDialog] = useState(false)
  const [showDonorboxDialog, setShowDonorboxDialog] = useState(false)
  const [showVoiceCommandDialog, setShowVoiceCommandDialog] = useState(false)
  const [showSpeakerStatsDialog, setShowSpeakerStatsDialog] = useState(false)
  const [showEmbedDialog, setShowEmbedDialog] = useState(false)
  const [showShortcutsDialog, setShowShortcutsDialog] = useState(false)
  const [showSettingsDialog, setShowSettingsDialog] = useState(false)
  const [showPrivacyDialog, setShowPrivacyDialog] = useState(false)
  const [showQualityDialog, setShowQualityDialog] = useState(false)
  const [selectedCamera, setSelectedCamera] = useState("HD Camera")
  const [selectedQuality, setSelectedQuality] = useState("HD")

  const [streamEntries, setStreamEntries] = useState<StreamEntry[]>([])

  const addStreamEntry = () => {
    setStreamEntries([...streamEntries, { id: Date.now().toString(), platform: "", url: "" }])
  }

  const updateStreamEntry = (id: string, field: "platform" | "url", value: string) => {
    setStreamEntries(streamEntries.map(entry =>
      entry.id === id ? { ...entry, [field]: value } : entry
    ))
  }

  const removeStreamEntry = (id: string) => {
    setStreamEntries(streamEntries.filter(entry => entry.id !== id))
  }


  const participantss = [
    { name: "Akhil Kumar", time: "5m34s", avatar: "/assets/images/akhil.png" },
    { name: "Shoeb Ahmad", time: "3m21s", avatar: "/assets/images/shoeb.png" },
    // ... other participants
  ]

  const shortcuts = [
    { key: "F", action: "Show or hide video thumbnails" },
    { key: "M", action: "Mute or unmute your microphone" },
    { key: "V", action: "Start or stop your camera" },
    // ... other shortcuts
  ]

  const emojis = [
    { emoji: "👍", name: "thumbs-up" },
    { emoji: "👎", name: "thumbs-down" },
    { emoji: "👋", name: "wave" },
    { emoji: "👏", name: "clap" },
    { emoji: "🔥", name: "fire" },
    { emoji: "🎉", name: "party" },
    { emoji: "😍", name: "heart-eyes" },
    { emoji: "😂", name: "laugh" },
    { emoji: "🎁", name: "gift" },
  ]

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    if (selectedEmoji) {
      const timer = setTimeout(() => {
        setSelectedEmoji(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [selectedEmoji])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: String(messages.length + 1),
          senderId: '1',
          text: newMessage,
          timestamp: new Date(),
        },
      ])
      setNewMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleParticipantMute = (participantId: string) => {
    setParticipants(participants.map(p =>
      p.id === participantId ? { ...p, isMuted: !p.isMuted } : p
    ))
  }

  const toggleParticipantVideo = (participantId: string) => {
    setParticipants(participants.map(p =>
      p.id === participantId ? { ...p, isVideoOff: !p.isVideoOff } : p
    ))
  }

  const toggleParticipantHandRaise = (participantId: string) => {
    setParticipants(participants.map(p =>
      p.id === participantId ? { ...p, isHandRaised: !p.isHandRaised } : p
    ))
  }

  const muteAll = () => {
    setParticipants(participants.map(p => ({ ...p, isMuted: true })))
  }

  const turnOffAllVideos = () => {
    setParticipants(participants.map(p => ({ ...p, isVideoOff: true })))
  }

  const addPollOption = () => {
    setNewPoll(prev => ({
      ...prev,
      options: [...prev.options, '']
    }))
  }

  const updatePollOption = (index: number, value: string) => {
    setNewPoll(prev => ({
      ...prev,
      options: prev.options.map((opt, i) => i === index ? value : opt)
    }))
  }

  const handleCreatePoll = () => {
    if (newPoll.question.trim() && newPoll.options.every(opt => opt.trim())) {
      const poll: Poll = {
        id: `poll-${polls.length + 1}`,
        question: newPoll.question,
        options: newPoll.options,
        votes: {}
      }
      setPolls([...polls, poll])
      setNewPoll({
        question: '',
        options: ['', '']
      })
    }
  }

  const handleEmojiSelect = (emoji: string) => {
    setSelectedEmoji(emoji)
    setShowEmojiPicker(false)
  }

  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col p-4 bg-background">
        {/* Top Bar */}
        <div className="flex items-center justify-between bg-header rounded-lg mb-4 px-4 py-2">
          <div className="flex items-center gap-2">
          <Image
              src="/assets/images/logo-white.svg"
              alt="Meet Hour"
              width={200}
              height={36}
              className="p-2"
            />
            <Separator orientation="vertical" className="h-6 text-gray-300" />
            <span className="text-lg font-medium text-white">
              UX UI Discussions - 15-10-2024-20:00PM IST
            </span>
          </div>
          <div className="flex items-center gap-2">
          <Button 
              variant={isRecording ? "destructive" : "secondary"} 
              size="sm"
              onClick={() => setIsRecording(!isRecording)}
            >
              {isRecording ? (
                <>
                  <Square className="mr-2 h-4 w-4" />
                  Stop
                </>
              ) : (
                <>
                  <span className="mr-2 h-4 w-4 rounded-full bg-red-500" />
                  Rec
                </>
              )}
            </Button>
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => setShowVoiceCommand(true)}
              className="relative"
            >
              <div className="relative h-4 w-4">
                <Speech className="h-4 w-4" />
                {isListening && (
                  <div className="absolute -right-1 -top-1">
                    <div className="flex gap-0.5">
                      <div className="h-2 w-0.5 animate-wave bg-current" style={{ animationDelay: '0ms' }} />
                      <div className="h-2 w-0.5 animate-wave bg-current" style={{ animationDelay: '100ms' }} />
                      <div className="h-2 w-0.5 animate-wave bg-current" style={{ animationDelay: '200ms' }} />
                    </div>
                  </div>
                )}
              </div>
            </Button>
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="sm">
                  {viewMode === 'stage' && <LayoutGrid className="mr-2 h-4 w-4" />}
                  {viewMode === 'verticalFilmstrip' && <LayoutPanelLeft className="mr-2 h-4 w-4" />}
                  {viewMode === 'horizontalFilmstrip' && <LayoutPanelTop className="mr-2 h-4 w-4" />}
                  {viewMode === 'tile' && <Grid className="mr-2 h-4 w-4" />}
                  {viewMode === 'stage' && 'Stage View'}
                  {viewMode === 'verticalFilmstrip' && 'Vertical Filmstrip'}
                  {viewMode === 'horizontalFilmstrip' && 'Horizontal Filmstrip'}
                  {viewMode === 'tile' && 'Tile View'}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => setViewMode('stage')}>
                  <LayoutGrid className="mr-2 h-4 w-4" />
                  Stage View
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setViewMode('verticalFilmstrip')}>
                  <LayoutPanelLeft className="mr-2 h-4 w-4" />
                  Vertical Filmstrip View
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setViewMode('horizontalFilmstrip')}>
                  <LayoutPanelTop className="mr-2 h-4 w-4" />
                  Horizontal Filmstrip View
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setViewMode('tile')}>
                  <Grid className="mr-2 h-4 w-4" />
                  Tile View
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
          </div>
        </div>

        <div className="relative flex flex-1 ">
          {/* Main Content */}
          <div className="relative flex-1 p-2 mb-4"  style={{ border: "3px solid #1ACC8D", borderRadius:"12px" }}>
            {/* Vignette Overlay */}
          <div className="absolute m-2 inset-0"
            style={{background:"radial-gradient(circle, rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, 0.6) 100%)", borderRadius:"12px" }}>

          </div>

            {/* Image */}
          <Image
            src="/assets/images/person.png"
            alt="Video conference participant"
            width={1280}
            height={720}
            className="h-full w-full rounded-lg object-cover"
            style={{ borderRadius:"12px" }}
          />
            {/* Top Right Controls */}
            <div className="absolute right-4 top-4 flex items-center gap-2">
            {participants.some(p => p.isHandRaised) && (
                <Button variant="secondary" size="sm">
                  <Hand className="mr-2 h-4 w-4" />
                  {participants.find(p => p.isHandRaised)?.name} wants to talk
                </Button>
              )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button style={{ backgroundColor: "hsla(0, 0%, 0%, 0.6)" }} size="sm">
                  {viewMode === 'stage' && <GalleryThumbnails className="mr-2 h-4 w-4" />}
                  {viewMode === 'verticalFilmstrip' && <LayoutPanelLeft className="mr-2 h-4 w-4" />}
                  {viewMode === 'horizontalFilmstrip' && <LayoutPanelTop className="mr-2 h-4 w-4" />}
                  {viewMode === 'tile' && <Grid className="mr-2 h-4 w-4" />}
                  {viewMode === 'stage' && 'Stage View'}
                  {viewMode === 'verticalFilmstrip' && 'Vertical Filmstrip'}
                  {viewMode === 'horizontalFilmstrip' && 'Horizontal Filmstrip'}
                  {viewMode === 'tile' && 'Tile View'}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => setViewMode('stage')}>
                  <GalleryThumbnails className="mr-2 h-4 w-4" />
                  Stage View
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setViewMode('verticalFilmstrip')}>
                  <LayoutPanelLeft className="mr-2 h-4 w-4" />
                  Vertical Filmstrip View
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setViewMode('horizontalFilmstrip')}>
                  <LayoutPanelTop className="mr-2 h-4 w-4" />
                  Horizontal Filmstrip View
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setViewMode('tile')}>
                  <Grid className="mr-2 h-4 w-4" />
                  Tile View
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
              
              <Button style={{ backgroundColor: "hsla(0, 0%, 0%, 0.6)" }} size="sm">
                <PictureInPicture className="mr-2 h-4 w-4" />
                Picture in Picture
              </Button>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    style={{ backgroundColor: "hsla(0, 0%, 0%, 0.6)" }}
                    size="sm"
                    onClick={() => setShowPrivacyDialog(true)}
                  >
                    <LockKeyhole className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Privacy Policy
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    style={{ backgroundColor: "hsla(0, 0%, 0%, 0.6)" }} 
                    size="sm"
                    onClick={() => setShowQualityDialog(true)}
                  >
                    <Signal className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Video Quality
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    style={{ backgroundColor: "hsla(0, 0%, 0%, 0.6)" }} 
                    size="sm"
                    onClick={() => setShowSettingsDialog(true)}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Settings
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Right Side Controls */}
            <div className="absolute right-4 top-1/2 flex -translate-y-1/2 flex-col gap-2">
              <Button style={{ backgroundColor: "hsla(0, 0%, 0%, 0.6)" }} size="icon">
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button style={{ backgroundColor: "hsla(0, 0%, 0%, 0.6)" }} size="icon">
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button style={{ backgroundColor: "hsla(0, 0%, 0%, 0.6)" }} size="icon">
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Participant Name */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-md bg-black/50 px-2 py-1 text-white">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              Akhil Kumar
            </div>

            {/* Emoji Animation */}
            {selectedEmoji && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="animate-emoji text-9xl">{selectedEmoji}</span>
              </div>
            )}
          </div>

          {/* Sidebar Content */}
          {sidebarContent === 'participants' && (
            <div className="w-80 border-l bottom-nav ml-3 mb-4 rounded-lg">
              <div className="flex items-center justify-between bg-header rounded-t-md border-b p-4">
                <h2 className="font-semibold text-white">Meeting Participants (8)</h2>
                <Button variant="outline" size="sm">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite
                </Button>
              </div>
              <div className="p-4">
                <div className="mb-4 flex gap-2">
                  <Button variant="outline" size="sm" onClick={muteAll}>
                    Force Mute All
                  </Button>
                  <Button variant="outline" size="sm" onClick={turnOffAllVideos}>
                    Force Video Mute All
                  </Button>
                </div>
                <ScrollArea className="h-[calc(100vh-15rem)]">
                  <div className="space-y-4">
                    {participants.map((participant) => (
                      <div key={participant.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Image
                            src={participant.avatar}
                            alt={participant.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <div>
                            <div className="font-medium">{participant.name}</div>
                            <div className="text-sm text-muted-foreground">{participant.role}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleParticipantMute(participant.id)}
                          >
                            {participant.isMuted ? (
                              <MicOff className="h-4 w-4" />
                            ) : (
                              <Mic className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleParticipantVideo(participant.id)}
                          >
                            {participant.isVideoOff ? (
                              <VideoOff className="h-4 w-4" />
                            ) : (
                              <VideoIcon className="h-4 w-4" />
                            )}
                          </Button>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          )}

          {sidebarContent === 'chat' && (
            <div className="w-80 border-l ml-3 mb-4 rounded-lg bottom-nav">
              <div className="flex h-14 items-center rounded-t-md justify-between border-b bg-header p-4">
                <h2 className="font-semibold text-white">Chat</h2>
              </div>
              <div className="flex h-[calc(100vh-12rem)] flex-col">
                <ScrollArea ref={scrollRef} className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => {
                      const sender = participants.find(p => p.id === message.senderId)
                      const isCurrentUser = message.senderId === '1'

                      return (
                        <div
                          key={message.id}
                          className={`flex items-start gap-3 ${isCurrentUser ? 'flex-row-reverse' : ''}`}
                        >
                          <Image
                            src={sender?.avatar || '/placeholder.svg?height=40&width=40'}
                            alt={sender?.name || 'User'}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                          <div className={`flex max-w-[70%] flex-col ${isCurrentUser ? 'items-end' : ''}`}>
                            <span className="text-sm font-medium">{sender?.name}</span>
                            <div
                              className={`rounded-lg p-3 ${
                                isCurrentUser
                                  ? 'bg-header text-white'
                                  : 'bg-muted'
                              }`}
                            >
                              <p className="text-sm">{message.text}</p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </ScrollArea>
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1"
                    />
                    <Button size="icon" variant="ghost">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button size="icon" onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {sidebarContent === 'polls' && (
            <div className="w-80 border-l ml-3 mb-4 rounded-lg bottom-nav">
              <div className="flex h-14 items-center rounded-t-md justify-between border-b bg-header p-4">
                <h2 className="font-semibold text-white">Create A Poll</h2>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Poll Question
                    </label>
                    <Input
                      placeholder="Ask a question"
                      value={newPoll.question}
                      onChange={(e) => setNewPoll(prev => ({ ...prev, question: e.target.value }))}
                      className="mt-1.5"
                    />
                  </div>
                  {newPoll.options.map((option, index) => (
                    <div key={index}>
                      <label className="text-sm font-medium text-muted-foreground">
                        Poll Option {index + 1}
                      </label>
                      <Input
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => updatePollOption(index, e.target.value)}
                        className="mt-1.5"
                      />
                    </div>
                  ))}
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={addPollOption}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Option
                  </Button>
                  <div className="flex gap-2 pt-4">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        setNewPoll({ question: '', options: ['', ''] })
                        setSidebarContent(null)
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="flex-1"
                      onClick={handleCreatePoll}
                    >
                      Send
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Controls */}
        <div className="relative items-center justify-between rounded-none p-none mt-16">
          <div className="absolute bottom-2 flex items-center gap-4 rounded-lg bottom-nav p-2 shadow-md"  style={{minWidth:"1005px"}}>
            <div className="flex items-center gap-2">
              <div style={{backgroundColor:'#EFF6FF', borderRadius:'50px',}}>
                <DropdownMenu>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center">
                    <Button
                      style={{
                        borderRadius:'50px',
                        backgroundColor: isMuted ? '#DAE7F8' : 'transparent',
                        color: '#395071',
                      }}
                      size="icon"
                      onClick={() => setIsMuted(!isMuted)}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E4EBF5')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = isMuted ? '#F8FBFF' : 'transparent')}
                    >
                      {isMuted ? <MicOff className="rounded" style={{ color: '#4b6790' }} /> : <Mic className="rounded" style={{  minWidth:'40px', color: '#4b6790' }} />}
                    </Button>

                      <DropdownMenuTrigger asChild>
                        <Button style={{marginLeft:'-10px', backgroundColor:'transparent', color:'#000'}} className="rounded-full" size="icon">
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    {isMuted ? "Unmute" : "Mute"}
                  </TooltipContent>
                </Tooltip>
                <DropdownMenuContent align="start" className="w-80">
                  <div className="p-4 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium flex items-center gap-2">
                        <Mic className="h-4 w-4" /> Microphones
                      </h3>
                      {audioInputs.map((input) => (
                        <div key={input.id} className="flex items-center gap-2">
                          <input
                            type="radio"
                            id={`mic-${input.id}`}
                            name="microphone"
                            checked={selectedAudioInput === input.id}
                            onChange={() => setSelectedAudioInput(input.id)}
                            className="rounded-full"
                          />
                          <label htmlFor={`mic-${input.id}`} className="flex-1 text-sm">
                            {input.name}
                          </label>
                          <div className="w-20 h-1 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-500"
                              style={{ width: `${input.level}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Volume2 className="h-4 w-4" /> Microphone Volume
                      </label>
                      <Slider
                        value={[micVolume]}
                        onValueChange={([value]) => setMicVolume(value)}
                        max={100}
                        step={1}
                      />
                    </div>
                    <DropdownMenuSeparator />
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium flex items-center gap-2">
                        <Volume className="h-4 w-4" /> Speakers
                      </h3>
                      {audioOutputs.map((output) => (
                        <div key={output.id} className="flex items-center gap-2">
                          <input
                            type="radio"
                            id={`speaker-${output.id}`}
                            name="speaker"
                            checked={selectedAudioOutput === output.id}
                            onChange={() => setSelectedAudioOutput(output.id)}
                            className="rounded-full"
                          />
                          <label htmlFor={`speaker-${output.id}`} className="text-sm">
                            {output.name}
                          </label>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Volume2 className="h-4 w-4" /> Speaker Volume
                      </label>
                      <Slider
                        value={[speakerVolume]}
                        onValueChange={([value]) => setSpeakerVolume(value)}
                        max={100}
                        step={1}
                      />
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              </div>
              <div style={{backgroundColor:'#EFF6FF', borderRadius:'50px', }}>
              <DropdownMenu>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center">
                    <Button
                      style={{
                        borderRadius:'50px',
                        backgroundColor: isVideoOff ? '#F8FBFF' : 'transparent', // Default color based on state
                        color: '#4b6790',
                      }}
                      size="icon"
                      onClick={() => setIsVideoOff(!isVideoOff)}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FBFF')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = isVideoOff ? '#F8FBFF' : 'transparent')}
                    >
                      {isVideoOff ? (
                        <VideoOff className="rounded" style={{  minWidth:'40px', color: '#4b6790' }} />
                      ) : (
                        <VideoIcon className="rounded" style={{  minWidth:'40px', color: '#4b6790' }} />
                      )}
                    </Button>

                      <DropdownMenuTrigger asChild>
                        <Button style={{marginLeft:'-10px', backgroundColor:'transparent', color:'#000'}} className="rounded-full" size="icon">
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    {isVideoOff ? "Unmute Video" : "Mute Video"}
                  </TooltipContent>
                </Tooltip>
                <DropdownMenuContent align="start" className="w-80">
                  <div className="p-4 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium flex items-center gap-2">
                        <VideoIcon className="h-4 w-4" /> Camera
                      </h3>
                      <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                        <Image
                          src="/assets/images/placeholder.svg"
                          alt="Camera preview"
                          width={320}
                          height={180}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <Button className="w-full" variant="outline">
                      Camera Settings
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              </div>
              <div style={{backgroundColor:'#EFF6FF', borderRadius:'50px',}}>
              <DropdownMenu>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center">
                    {/* <Button
                      style={{
                        backgroundColor: 'white',  // Default background color
                        color: '#4b6790',          // Icon color
                      }}
                      size="icon"
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FBFF')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
                    >
                      <MonitorUp className="h-4 w-4" style={{ color: '#4b6790' }} />
                    </Button> */}

                      <DropdownMenuTrigger asChild>
                      <Button
                      style={{
                        borderRadius:'50px',
                        backgroundColor: 'transparent',  // Default background color
                        color: '#4b6790',          // Icon color
                      }}
                      size="icon"
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FBFF')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <MonitorUp className="rounded" style={{  minWidth:'40px', color: '#4b6790' }} />
                    </Button>
                      </DropdownMenuTrigger>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    Share Screen
                  </TooltipContent>
                </Tooltip>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem>
                    <MonitorUp className="h-4 w-4 mr-2" />
                    Screen Share
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Pencil className="h-4 w-4 mr-2" />
                    Whiteboard Share
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FileText className="h-4 w-4 mr-2" />
                    LivePad
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Youtube className="h-4 w-4 mr-2" />
                    YouTube Share
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              </div>

              <Button style={{backgroundColor:'#DC3C4E', borderRadius:'50px',}}>
                <PhoneOff className="mr-2 h-4 w-4" />
                End Meeting
              </Button>
            </div>
            <div className="flex items-center gap-2 border-l pl-4">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={copyMeetingLink}>
                  <Copy className="h-4 w-4"/>
                </Button>
                <code style={{border: '1px Solid #C7D5E9'}} className="rounded bg-muted px-3 py-1.5">MHR2410152126</code>
              </div>
              <Button style={{backgroundColor:'#395071'}} onClick={() => setShowInviteDialog(true)}>
                <UserPlus className="h-4 w-4 " />
                Invite
              </Button>
            </div>
          </div>
          <div className="absolute bottom-2 right-0 flex items-center gap-2 rounded-lg bottom-nav p-2 shadow-md">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  style={{
                    borderRadius:'50px',
                    backgroundColor: isHandRaised 
                      ? '#395071' 
                      : participants.some(p => p.isHandRaised) 
                        ? '#395071' 
                        : 'transparent', // Conditionally set background
                    color: isHandRaised ? '#fff' : '#4b6790', // Text color based on isActive
                  }}
                  
                  size="icon"
                  onMouseEnter={(e) => {
                    if (!isHandRaised) {
                      e.currentTarget.style.backgroundColor = '#E4EBF5';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isHandRaised) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                  onClick={() => {
                    setIsHandRaised((prev) => !prev); // Toggle active state
                    toggleParticipantHandRaise('1'); // Call your function
                  }}
                >
                  <Hand className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Raise Hand
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  <Smile className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="flex gap-1 p-2">
                {emojis.map((emoji) => (
                  <Button
                    key={emoji.name}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 p-0 hover:bg-muted"
                    onClick={() => handleEmojiSelect(emoji.emoji)}
                  >
                    <span className="text-lg">{emoji.emoji}</span>
                  </Button>
                ))}
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                style={{
                  borderRadius:'50px',
                  backgroundColor: isChatActive 
                    ? '#395071'  : 'transparent', // Conditionally set background
                  color: isChatActive ? '#fff' : '#4b6790', // Text color based on isActive
                }}
                  variant={sidebarContent === 'chat' ? "secondary" : "ghost"}
                  size="icon"
                  onMouseEnter={(e) => {
                    if (!isChatActive) {
                      e.currentTarget.style.backgroundColor = '#E4EBF5';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isChatActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                  onClick={() => {
                    setIsChatActive((prev) => !prev); // Toggle active state
                    setSidebarContent(sidebarContent === 'chat' ? null : 'chat')
                  }}
                  
                >
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Chat
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  style={{
                    borderRadius:'50px',
                    backgroundColor: isPollsActive 
                      ? '#395071'  : 'transparent', // Conditionally set background
                    color: isPollsActive ? '#fff' : '#4b6790', // Text color based on isActive
                  }}
                  variant={sidebarContent === 'polls' ? "secondary" : "ghost"}
                  size="icon"
                  onMouseEnter={(e) => {
                    if (!isPollsActive) {
                      e.currentTarget.style.backgroundColor = '#E4EBF5';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isPollsActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                  onClick={() => {
                    setIsPollsActive((prev) => !prev); // Toggle active state
                    setSidebarContent(sidebarContent === 'polls' ? null : 'polls')
                  }}
                >
                  <ListTodo className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Polls
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                style={{
                  borderRadius:'50px',
                  backgroundColor: isParticipantsActive 
                    ? '#395071'  : 'transparent', // Conditionally set background
                  color: isParticipantsActive ? '#fff' : '#4b6790', // Text color based on isActive
                }}
                  variant={sidebarContent === 'participants' ? "secondary" : "ghost"}
                  size="icon"
                  onMouseEnter={(e) => {
                    if (!isParticipantsActive) {
                      e.currentTarget.style.backgroundColor = '#E4EBF5';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isParticipantsActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                  onClick={() => {
                    setIsParticipantsActive((prev) => !prev); // Toggle active state
                    setSidebarContent(sidebarContent === 'participants' ? null : 'participants')
                  }}
                >
                  <Users className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Participants
              </TooltipContent>
            </Tooltip>
            
           
            <DropdownMenu>
                <Tooltip>
                  <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center">
                      <Button 
                      variant="ghost" 
                      size="icon">
                        <MenuIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    More Options
                  </TooltipContent>
                </Tooltip>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem onClick={() => setShowQualityDialog(true)}>
                    <Film className="h-4 w-4 mr-2" />
                    Manage Video Quality
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowLiveStreamDialog(true)}>
                    <Radio className="h-4 w-4 mr-2" />
                    Live Stream
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowCPConnectDialog(true)}>
                    <FileText className="h-4 w-4 mr-2" />
                    C&P Connect Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowDonorboxDialog(true)}>
                    <Youtube className="h-4 w-4 mr-2" />
                    Donorbox Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowVoiceCommandDialog(true)}>
                    <Speech className="h-4 w-4 mr-2" />
                    Voice Command
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowSpeakerStatsDialog(true)}>
                    <AudioLines className="h-4 w-4 mr-2" />
                    Speaker Stats
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowEmbedDialog(true)}>
                    <Code className="h-4 w-4 mr-2" />
                    Embed Meeting
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowShortcutsDialog(true)}>
                    <SquareSlash className="h-4 w-4 mr-2" />
                    View Shortcuts
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Voice Command Dialog */}
      <Dialog open={showVoiceCommand} onOpenChange={setShowVoiceCommand}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle>Voice Command For Meet Hour</DialogTitle>
                
              </div>
            </DialogHeader>
            <div className="flex flex-col items-center gap-4 py-4">
              <p className="text-sm text-muted-foreground">
                Click on the mic and voice a command
              </p>
              <button
                className="group relative h-24 w-24 rounded-full bg-red-600 transition-transform hover:scale-105 active:scale-95"
                onClick={() => setIsListening(!isListening)}
              >
                <Mic className="h-8 w-8 text-white" style={{display:"inline"}}/>
                {isListening && (
                  <>
                    <span className="absolute inset-0 animate-ping rounded-full bg-red-600/60" />
                    <span className="absolute inset-0 animate-ping rounded-full bg-red-600/40 delay-150" />
                    <span className="absolute inset-0 animate-ping rounded-full bg-red-600/20 delay-300" />
                  </>
                )}
              </button>
            </div>
          </DialogContent>
        </Dialog>

      {/* Settings Dialog */}
      <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <div className="flex items-center justify-between bg-slate-800 p-4 -m-6 mb-2 rounded-t-lg">
                <DialogTitle className="text-white">Settings</DialogTitle>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setShowSettingsDialog(false)}
                  className="text-white hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </DialogHeader>
            <Tabs defaultValue="devices" className="w-full">
              <TabsList>
                <TabsTrigger value="devices">Devices</TabsTrigger>
                <TabsTrigger value="general">General</TabsTrigger>
              </TabsList>
              <TabsContent value="devices" className="space-y-4">
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <label>Camera</label>
                      <Select value={selectedCamera} onValueChange={setSelectedCamera}>
                        <SelectTrigger className="w-[300px]">
                          <SelectValue placeholder="Select camera" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="HD Camera">HD Camera</SelectItem>
                          <SelectItem value="Webcam">Webcam</SelectItem>
                          <SelectItem value="External Camera">External Camera</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                      <Image
                        src="/assets/images/placeholder.svg"
                        alt="Camera preview"
                        width={200}
                        height={180}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <label>Microphone</label>
                      <Select value={selectedAudioInput} onValueChange={setSelectedAudioInput}>
                        <SelectTrigger className="w-[300px]">
                          <SelectValue placeholder="Select microphone" />
                        </SelectTrigger>
                        <SelectContent>
                          {audioInputs.map((input) => (
                            <SelectItem key={input.id} value={input.id}>
                              {input.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <label>Audio Output</label>
                      <Select value={selectedAudioOutput} onValueChange={setSelectedAudioOutput}>
                        <SelectTrigger className="w-[300px]">
                          <SelectValue placeholder="Select speakers" />
                        </SelectTrigger>
                        <SelectContent>
                          {audioOutputs.map((output) => (
                            <SelectItem key={output.id} value={output.id}>
                              {output.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-fit">
                      Test Audio
                    </Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="general" className="space-y-6">
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Your Display Name</label>
                    <Input
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Your Email</label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Language</label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Pre Meeting</label>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="delete-cache"
                        checked={deleteCache}
                        onCheckedChange={(checked) => setDeleteCache(checked as boolean)}
                      />
                      <label
                        htmlFor="delete-cache"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Delete Cache
                      </label>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setShowSettingsDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowSettingsDialog(false)}>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      {/* Privacy Policy Dialog */}
      <Dialog open={showPrivacyDialog} onOpenChange={setShowPrivacyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Privacy Policy</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Your privacy is important to us. This policy outlines how we handle your data during video conferences.</p>
            <h3 className="font-semibold">Data Collection</h3>
            <p>We collect only necessary data for the functioning of the video conference:</p>
            <ul className="list-disc pl-6">
              <li>Audio and video streams (not recorded unless explicitly started)</li>
              <li>Chat messages</li>
              <li>Meeting participation data</li>
            </ul>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowPrivacyDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Video Quality Dialog */}
      <Dialog open={showQualityDialog} onOpenChange={setShowQualityDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Video Quality</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Select value={selectedQuality} onValueChange={setSelectedQuality}>
              <SelectTrigger>
                <SelectValue placeholder="Select quality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="HD">HD (720p)</SelectItem>
                <SelectItem value="SD">SD (480p)</SelectItem>
                <SelectItem value="LD">LD (360p)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Select lower quality if you're experiencing connection issues.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowQualityDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowQualityDialog(false)}>Apply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Video Quality Dialog
      <Dialog open={showQualityDialog} onOpenChange={setShowQualityDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Manage Video Quality</DialogTitle>
          </DialogHeader>
          <RadioGroup value={selectedQuality} onValueChange={setSelectedQuality} className="grid grid-cols-2 gap-4">
            <div>
              <RadioGroupItem value="LB" id="lb" className="peer sr-only" />
              <Label
                htmlFor="lb"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <span>Low Bandwidth</span>
                <span className="text-xs">LB</span>
              </Label>
            </div>
            <div>
              <RadioGroupItem value="LD" id="ld" className="peer sr-only" />
              <Label
                htmlFor="ld"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <span>Low Definition</span>
                <span className="text-xs">LD</span>
              </Label>
            </div>
            <div>
              <RadioGroupItem value="SD" id="sd" className="peer sr-only" />
              <Label
                htmlFor="sd"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <span>Standard Definition</span>
                <span className="text-xs">SD</span>
              </Label>
            </div>
            <div>
              <RadioGroupItem value="HD" id="hd" className="peer sr-only" />
              <Label
                htmlFor="hd"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <span>High Definition</span>
                <span className="text-xs">HD</span>
              </Label>
            </div>
          </RadioGroup>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowQualityDialog(false)}>Cancel</Button>
            <Button onClick={() => setShowQualityDialog(false)}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
      {/* Live Stream Dialog */}
      <Dialog open={showLiveStreamDialog} onOpenChange={setShowLiveStreamDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Live Stream Setup</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {streamEntries.map((entry, index) => (
              <div key={entry.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Streaming Platform {index + 1}</Label>
                  <Button variant="ghost" size="sm" onClick={() => removeStreamEntry(entry.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <Select
                  value={entry.platform}
                  onValueChange={(value) => updateStreamEntry(entry.id, "platform", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {streamingPlatforms.map((platform) => (
                      <SelectItem key={platform.id} value={platform.id}>
                        <div className="flex items-center">
                          {platform.icon}
                          <span className="ml-2">{platform.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter Stream Key URL"
                    value={entry.url}
                    onChange={(e) => updateStreamEntry(entry.id, "url", e.target.value)}
                  />
                </div>
              </div>
            ))}
            <Button variant="outline" onClick={addStreamEntry} className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Streaming Platform
            </Button>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLiveStreamDialog(false)}>Cancel</Button>
            <Button onClick={() => {
              console.log("Stream entries:", streamEntries)
              setShowLiveStreamDialog(false)
            }}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* C&P Connect Dialog */}
      <Dialog open={showCPConnectDialog} onOpenChange={setShowCPConnectDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>C&P Connect Settings</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mb-4">
            <div className="space-y-2">
              <Label>Connect Form URL or Widget URL</Label>
              <Input placeholder="Enter Campaign URL" />
            </div>
            
          </div>
          <DialogFooter>
          <Image
              src="/assets/images/c&p-connect.png"
              alt="Click & Pledge logo"
              width={200}
              height={50}
              className="mx-auto"
            />
            <Button variant="outline" onClick={() => setShowCPConnectDialog(false)}>Cancel</Button>
            <Button onClick={() => setShowCPConnectDialog(false)}>Connect</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Donorbox Dialog */}
      <Dialog open={showDonorboxDialog} onOpenChange={setShowDonorboxDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Donorbox Settings</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mb-4">
            <div className="space-y-2">
              <Label>Donorbox Campaign URL</Label>
              <Input placeholder="Enter Campaign URL" />
            </div>
            
          </div>
          <DialogFooter>
          <Image
              src="/assets/images/donorbox.svg"
              alt="Donorbox logo"
              width={180}
              height={40}
              className="mx-auto"
            />
            <Button variant="outline" onClick={() => setShowDonorboxDialog(false)}>Cancel</Button>
            <Button onClick={() => setShowDonorboxDialog(false)}>Connect</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Voice Command Dialog */}
      <Dialog open={showVoiceCommandDialog} onOpenChange={setShowVoiceCommandDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Voice Command For Meet Hour</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-8">
            <p className="text-sm text-muted-foreground">Click on the mic and voice a command</p>
            <Button
              variant="destructive"
              size="lg"
              className="h-24 w-24 rounded-full p-0"
            >
              <Mic className="h-8 w-8" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Speaker Stats Dialog */}
      <Dialog open={showSpeakerStatsDialog} onOpenChange={setShowSpeakerStatsDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Speaker Stats</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[300px]">
            <div className="space-y-4">
              {participantss.map((participant) => (
                <div key={participant.name} className="flex items-center justify-between p-2">
                  <div className="flex items-center gap-2">
                    <Image
                      src={participant.avatar}
                      alt={participant.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span>{participant.name}</span>
                  </div>
                  <span className="rounded-full bg-primary/10 px-2 py-1 text-xs">
                    {participant.time}
                  </span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Embed Meeting Dialog */}
      <Dialog open={showEmbedDialog} onOpenChange={setShowEmbedDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Embed Meeting</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="rounded-lg bg-muted p-4">
              <pre className="text-sm">
                <code>{`<iframe allow="camera; microphone; fullscreen; 
display-capture; autoplay" src="https://meethour.io/
MHR2410152126?pcode=b12864J8f738542d3a8e5d1e6225ae3c"
style="height: 100%; width: 100%; border: 0px;"></iframe>`}</code>
              </pre>
            </div>
            <Button variant="outline" className="w-full" onClick={() => {
              navigator.clipboard.writeText(`<iframe allow="camera; microphone; fullscreen; display-capture; autoplay" src="https://meethour.io/MHR2410152126?pcode=b12864J8f738542d3a8e5d1e6225ae3c" style="height: 100%; width: 100%; border: 0px;"></iframe>`)
            }}>
              <Copy className="mr-2 h-4 w-4" />
              Copy Embed Code
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Keyboard Shortcuts Dialog */}
      <Dialog open={showShortcutsDialog} onOpenChange={setShowShortcutsDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Keyboard Shortcuts</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[400px] pr-4">
            <div className="grid grid-cols-2 gap-4">
              {shortcuts.map((shortcut) => (
                <div
                  key={shortcut.key}
                  className="flex items-center justify-between rounded-lg border p-2"
                >
                  <span>{shortcut.action}</span>
                  <kbd className="rounded bg-muted px-2 py-1 text-xs">
                    {shortcut.key}
                  </kbd>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
      <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Invite Participants</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Share the meeting link to invite others
            </p>
            <div className="flex items-center gap-2 rounded-md border bg-muted p-2">
              <span className="flex-1 truncate text-sm">{meetingLink}</span>
              <Button
                variant="secondary"
                size="sm"
                className="shrink-0"
                onClick={copyMeetingLink}
              >
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Share meeting invitation with password
            </p>
            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" className="flex flex-col items-center justify-center h-20">
              <Image
                  src="/assets/images/Email.svg"
                  alt="Email"
                  width={32}
                  height={32}
                  className=""
                />
                <span className="text-xs">Email</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center justify-center h-20">
                <Image
                  src="/assets/images/Whatsapp.svg"
                  alt="WhatsApp"
                  width={32}
                  height={32}
                  className=""
                />
                <span className="text-xs">WhatsApp</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center justify-center h-20">
              <Image
                  src="/assets/images/Gmail.svg"
                  alt="Gmail"
                  width={32}
                  height={32}
                  className=""
                />
                <span className="text-xs">Gmail</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center justify-center h-20">
                <Image
                  src="/assets/images/Outlook.svg"
                  alt="Outlook"
                  width={32}
                  height={32}
                  className=""
                />
                <span className="text-xs">Outlook</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center justify-center h-20">
              <Image
                  src="/assets/images/Google-Calendar.svg"
                  alt="Google Calendar"
                  width={32}
                  height={32}
                  className=""
                />
                <span className="text-xs"> Google Calendar</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center justify-center h-20">
              <Image
                  src="/assets/images/Yahoo.svg"
                  alt="Yahoo"
                  width={32}
                  height={32}
                  className=""
                />
                <span className="text-xs">Yahoo</span>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>

      <style jsx global>{`
        .animate-emoji {
          animation: float 5s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </TooltipProvider>
  )
}
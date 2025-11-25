Output Files

    FrameView generates two output files:
        FrameView_<Application exe name>_YYYY_MM_DDTHHMMSS_Log.csv - contains per frame data
        FrameView_Summary.csv - contains aggregate statistics
    
    Notes:
       1. If you have an existing summary file and log file, it is recommended that you rename/delete or move it to a new location before using FrameView.
       2. If you have already generated summary file, it will be updated in the next benchmark only if you have closed the existing summary file.
   

    Columns in FrameView_<Application exe name>_YYYY_MM_DDTHHMMSS_Log.csv
    
        Application                 The name of the process that called Present (if known)
        GPU
        CPU
        Resolution                   Display resolution of application
        Runtime                      The runtime used to present (e.g., D3D9 or DXGI)
        AllowsTearing                Whether tearing is possible (1) or not (0)
        ProcessID                    The process ID of the process that called Present
        SwapChainAddress             The address of the swap chain that was presented into
        SyncInterval                 Sync interval used in the Present call
        PresentFlags                 Flags used in the Present call
        PresentMode                  The time of the Present call, measured from when FrameView/PresentMon recording started in seconds
        Dropped                      Whether the frame was dropped (1) or displayed (0); if dropped, MsUntilDisplayed will be 0
        TimeInSeconds                The time of the Present call, measured from when FrameView/PresentMon recording started in seconds
        MsBetweenPresents            The time between this Present call and the previous one, in milliseconds
        MsBetweenDisplayChange       The time between when the previous frame was displayed and this frame was, in milliseconds
        MsInPresentAPI               The time spent inside the Present call, in milliseconds
        MsRenderPresentLatency       The time between the Present call (TimeInSeconds) and when the GPU work was completed, in milliseconds
        MsUntilDisplayed             The time between the Present call (TimeInSeconds) and when the frame was displayed, in milliseconds
        Render Queue Depth           Number of Frames that have been queued for rendering
        MsPCLatency                  Time between PC receiving an input and frame being sent to the display, in milliseconds. Supported in Reflex 1.6 titles ("NA" if unsupported or in menus)
                                     Supported in titles with PC Latency Stats ("NA" if unsupported or in menus)
        GPU0Clk(MHz)                 Frequency of the graphics engine on GPU0
        GPU0MemClk(MHz)              Frequency of the frame buffer on GPU0
        GPU0Util(%)                  Graphics Engine Utilization of the GPU0
        GPU0Temp(C)                  Temperature of the GPU0
        GPU1Clk(MHz)                 In the event of two or more available GPUs, frequency of the graphics engine on GPU1
        GPU1MemClk(MHz)              In the event of two or more available GPUs, frequency of the frame buffer on GPU1
        GPU1Util(%)                  In the event of two or more available GPUs, graphics Engine Utilization of the GPU1
        GPU1Temp(C)                  In the event of two or more available GPUs, current temperature of the GPU1
        PCAT Power Total(W)          If a PCAT device is available, the total power consumption of the GPU as reported by PCAT
        Perf/W Total(F/J) (PCAT)     Performance per Watt considering MsBetweenPresents for performance and board power reported by PCAT
        Perf/W Total(F/J) (API)      Performance per Watt considering MsBetweenPresents for performance and board power reported by API
        Perf/W GPUOnly(F/J) (API)    Performance per Watt considering MsBetweenPresents for performance and GPU/Chip/ASIC power reported by API
        Perf/W Total-USBC(F/J) (API) Performance per Watt considering MsBetweenPresents for performance and board power excluding USBC reported by API
        GPUOnlyPwr(W) (API)          GPU/Chip/ASIC power
        NV-Total-USBCPwr(W) (API)    Board power excluding USBC
        NV Pwr(W) (API)              The total power consumption of the GPU as reported by NVIDIA API (NVAPI)
        AMDPwr(W) (API)              The total power consumption of the GPU as reported by AMD API
        CPUClk(MHz)                  Average CPU core frequency
        CPUUtil(%)                   Average core utilization of the CPU
        CPU Package Temp(C)          Average core temperature of the CPU
        CPU Package Power(W)         The total power consumption of the CPU
        CPU TDP (W)                  Thermal Design Power of the CPU
        CPUCoreUtil%[0..63]          Individual CPU core utilization (up to 64 cores)
        Current Battery Capacity(Wh) Only for Notebooks - current battery capacity (watt hours)
        Total Battery Capacity(Wh)   Only for Notebooks - total Battery capacity (watt hours)
        Battery Percentage           Only for Notebooks - battery percentage calculated from current battery capacity and total battery capacity
        Battery Drain Rate(W)        Only for Notebooks - rate of battery consumption (watts). Will be positive when charging and negative when discharging.

    Columns in FrameView_Summary.csv
    
        Timestamp                    End of Benchmark, represented as YYYY-MM-DD and HHMMSS PC local time
        Application                  Current detected application
        Log Name                     Name of the corresponding log contributing to summary file
        GPU0                         If more than one GPU is available (including iGPU), this is the first GPU
        GPU1                         If more than one GPU is available (including iGPU), this is the second GPU
        CPU
        Resolution                   Display resolution of application
        Runtime                      The Graphics API version/type used by the game
        Avg FPS                      Average frames per second, using displayed FPS scheduling metrics. One of 3 key metrics for evaluating a game.
        1% Low FPS                   Takes the slowest 1% frames and averages them. Reports stutter--the closer 1% Low is to Avg FPS, the more consistent the experience will be. One of 3 key metrics for evaluating a game.
        AvgPCLatency (ms)            Average time between PC receiving input and frame being sent to the display, in milliseconds. Reflex 1.6 titles supported ("NA" if unsupported or in menus). One of 3 key metrics for evaluating a game.
        
        Min FPS                      Minimum framerate
        Max FPS                      Maximum framerate
        0.1% Low FPS                 Takes the slowest .1% frames and averages them. Reports stutter--the closer .1% Low is to Avg FPS, the more consistent the experience will be.
        Time (ms)                    Duration of the benchmark
        MinPCLatency (ms)            Minimum time between PC receiving an input and frame being sent to the display, in milliseconds. Reflex 1.6 titles supported ("NA" if unsupported).
        MaxPCLatency (ms)            Maximum time between PC receiving an input and frame being sent to the display, in milliseconds. Reflex 1.6 titles supported ("NA" if unsupported).
        RenderPresentLatency (ms)    The time measured from the Present call to when the GPU work was complete
        Min Present FPS              Minimum framerate (calculated using MsBetweenPresents) 
        Max Present FPS              Maximum framerate (calculated using MsBetweenPresents)
        1% Low Present FPS           Takes the slowest 1% frames and averages them (calculated using MsBetweenPresents)
        0.1% Low Present FPS         Takes the slowest .1% frames and averages them (calculated using MsBetweenPresents)
        GPU0Clk(MHz)                 Frequency of the graphics engine on GPU0 in megahertz
        GPU0 Util%                   Graphics Engine Utilization of the GPU0
        GPU0Temp(C)                  Temperature of the GPU0
        GPU1Clk(MHz)                 In the event of two or more available GPUs, frequency of the graphics engine on GPU1
        GPU1Util(%)                  In the event of two or more available GPUs, graphics Engine Utilization of the GPU1
        GPU1Temp(C)                  In the event of two or more available GPUs, temperature of the GPU1
        Perf/Watt (F/J) (PCAT)       Performance per Watt considering MsBetweenPresents for performance and board power as measured by PCAT
        PCAT Power (Watts)           GPU board power as measured by PCAT
        GPU NV Power (Watts) (API)   The total power consumption of the GPU as reported by NVIDIA API
        CPUClk(MHz)                  Average CPU core frequency
        CPU Util %                   Average core utilization of the CPU
        CPU Temp (C)                 Average core temperature of the CPU
        CPU Package Power(Watts)     The total power consumption of the CPU
        Current Battery Capacity(Wh) Only for Notebooks - current battery capacity (watt hours)
        Total Battery Capacity(Wh)   Only for Notebooks - total battery capacity (watt hours)
        Battery Percentage           Only for Notebooks - battery percentage calculated from current battery capacity and total battery capacity
        Battery Drain Rate(W)        Only for Notebooks - rate of battery consumption (watts). Will be negative when discharging and NA when charging or at full charge
        Battery Charge Rate(W)       Only for Notebooks - rate of battery charging (watts). Will be positive when charging and NA when discharging or at full charge
        OS
        GPU Base Driver              The GPU driver branch used for generating the data
        GPU Driver Package           The GPU driver version used for generating the data
        System RAM
        Motherboard

Exclusion List
    To exclude an application from showing the overlay, add an entry to ExcludeList.overlay.txt file (found in Drive > ProgramData(hidden item) > NVIDIA Corporation > FrameView)
    To exclude a process for logging e.g. unwanted logs for browser running in the background, add an entry to ExcludeList.txt file (found in Drive > ProgramData(hidden item) > NVIDIA Corporation > FrameView)

Settings 
    Settings.ini has knobs to toggle features ON/OFF. Only toggle settings listed below.
    FPSOverlayDispMode              Bitmask (accepts both hex or decimal)
                                    0x800 - Enable per CPU core/thread utilization
    Note: For FrameView 1.3, Settings.ini would get overwritten during installation for a smooth update experience and hence user settings wouldn't be retained.

* Enabling "Scanout Color Bar" will impact performance marginally. 
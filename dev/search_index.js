var documenterSearchIndex = {"docs":
[{"location":"steady_state/#Steady-State","page":"Steady State","title":"Steady State","text":"","category":"section"},{"location":"steady_state/","page":"Steady State","title":"Steady State","text":"LinearOptics has a defined analytica solution through a linear system of equations. In Scalar case, one get an Array solution, and in Vectorial case, one gets a Matrix, where each collum represents the x,y,z-components.","category":"page"},{"location":"steady_state/","page":"Steady State","title":"Steady State","text":"using CoupledDipoles\nr =[1 2 0;\n    1 0 1.0]\natoms = Atom(Cube(), Array(transpose(r)), 10)\nlaser = Laser(PlaneWave3D(), 1e-6, 1.0)\nproblem = LinearOptics(Scalar(), atoms, laser)\nβₛₛ = steady_state(problem) # N-array\n\nproblem = LinearOptics(Vectorial(), atoms, laser)\nβₛₛ = steady_state(problem) # 3xN-matrix","category":"page"},{"location":"steady_state/","page":"Steady State","title":"Steady State","text":"NonLinearOptics has not well defined solution, therefore steady_state apply time_evolution function over the period tspan = (0, 500) and return the final state.","category":"page"},{"location":"steady_state/","page":"Steady State","title":"Steady State","text":"The solution is an Array of size 2N, corresponding to [langle sigma^- rangle langle sigma^z rangle].","category":"page"},{"location":"steady_state/","page":"Steady State","title":"Steady State","text":"using CoupledDipoles\nr =[1 2 0;\n    1 0 1.0]\natoms = Atom(Cube(), Array(transpose(r)), 10)\nlaser = Laser(PlaneWave3D(), 1e-6, 1.0)\nproblem = NonLinearOptics(MeanField(), atoms, laser)\nβₛₛ = steady_state(problem) # 2N-array","category":"page"},{"location":"steady_state/","page":"Steady State","title":"Steady State","text":"steady_state","category":"page"},{"location":"steady_state/#CoupledDipoles.steady_state","page":"Steady State","title":"CoupledDipoles.steady_state","text":"steady_state(problem::LinearOptics{Scalar})\n\nSolve x=G\\Ω, with default interaction_matrix and laser_field.\n\n\n\n\n\nsteady_state(problem::LinearOptics{Vectorial})\n\nSolve x=G\\Ω, with default interaction_matrix and laser_field. The solution x is reshaped as a 3xN matrix.\n\n\n\n\n\nsteady_state(problem::NonLinearOptics{MeanField})\n\n\n\n\n\n","category":"function"},{"location":"scattering/#Scattering","page":"Scattering","title":"Scattering","text":"","category":"section"},{"location":"scattering/","page":"Scattering","title":"Scattering","text":"The electric field measured at sensor positioned at mathbfR = Rhatn results from the sum of all  dipoles located at mathbfr_j and their respective states beta_j. The exact formula depends on the model and regime.","category":"page"},{"location":"scattering/","page":"Scattering","title":"Scattering","text":"","category":"page"},{"location":"scattering/#Electric-Field","page":"Scattering","title":"Electric Field","text":"","category":"section"},{"location":"scattering/#Scalar","page":"Scattering","title":"Scalar","text":"","category":"section"},{"location":"scattering/","page":"Scattering","title":"Scattering","text":"regime = :near_field $ E{sc}(\\mathbf{R}, t) = +i\\frac{\\Gamma}{2}\\sumj \\frac{e^{ ik0|\\mathbf{R} - \\mathbf{r}j| }}{k0|\\mathbf{R} - \\mathbf{r}j|}\\beta_j(t) $","category":"page"},{"location":"scattering/","page":"Scattering","title":"Scattering","text":"regime = :far_field $ E{sc}(\\mathbf{R}, t) \\approx +i\\frac{\\Gamma}{2} \\frac{e^{ ik0R }}{k0R}\\sumj exp( -ik0|\\hat{n} \\cdot \\mathbf{r}j| )\\beta_j(t) $","category":"page"},{"location":"scattering/#Vectorial","page":"Scattering","title":"Vectorial","text":"","category":"section"},{"location":"scattering/","page":"Scattering","title":"Scattering","text":"regime = :near_field $ E{vec}(\\mathbf{R}, t) = -i\\frac{\\Gamma}{2}\\sumj\\sum{\\eta}G{\\mu,\\eta}(\\mathbf{R}-\\mathbf{r}j)\\betaj^{\\eta}(t) $","category":"page"},{"location":"scattering/","page":"Scattering","title":"Scattering","text":"regime = :far_field $ E^\\mu{vec}(\\mathbf{R},t) \\approx -i\\frac{\\Gamma}{2}\\cdot\\frac{3}{2} \\frac{e^{ik0R}}{k0R}\\sumj\\sum\\eta(\\delta{\\mu, \\eta} - \\hat{n}\\mu\\hat{n}\\eta^*)exp(-ik0\\hat{\\mathbf{n}}\\cdot\\mathbf{r}j)\\beta_j^\\eta(t) $","category":"page"},{"location":"scattering/#Mean-Field","page":"Scattering","title":"Mean Field","text":"","category":"section"},{"location":"scattering/","page":"Scattering","title":"Scattering","text":"regime = :near_field|:far_field $ \\mathbf{E}{mf} = \\mathbf{E}{sc} $","category":"page"},{"location":"scattering/","page":"Scattering","title":"Scattering","text":"","category":"page"},{"location":"scattering/#Intensity","page":"Scattering","title":"Intensity","text":"","category":"section"},{"location":"scattering/#Scalar-2","page":"Scattering","title":"Scalar","text":"","category":"section"},{"location":"scattering/","page":"Scattering","title":"Scattering","text":"regime = :near_field|:far_field $ I{sc}(\\vec{R},t) = |\\mathbf{E}{sc}|^2 $","category":"page"},{"location":"scattering/#Vectorial-2","page":"Scattering","title":"Vectorial","text":"","category":"section"},{"location":"scattering/","page":"Scattering","title":"Scattering","text":"regime = :near_field|:far_field $ I{vec}(\\hat{n},t) = |\\mathbf{E}{vec}|^2 = \\sum\\mu|E^\\mu{vec}|^2 $","category":"page"},{"location":"scattering/#Mean-Field-2","page":"Scattering","title":"Mean Field","text":"","category":"section"},{"location":"scattering/","page":"Scattering","title":"Scattering","text":"regime = :near_field $ I{mf}(\\mathbf{R},t) = I{sc}(\\mathbf{R}, t) +\\frac{\\Gamma^2}{(2k0)^2} \\left [  \\sum{j} \\frac{- |\\betaj|^2    + \\frac{1+\\langle \\sigmaj^z \\rangle }{2}}{|R-rj|^2} \\right ]. $ `regime = :farfield` $ I{mf}(\\mathbf{R},t) = I{sc}(\\mathbf{R}, t) + \\frac{\\Gamma^2}{(2k0R)^2}\\sum{j=1}^N \\left ( -|\\betaj|^2 + \\frac{1 + \\langle \\sigmaj^z \\rangle }{2}\\right ) $","category":"page"},{"location":"scattering/","page":"Scattering","title":"Scattering","text":"","category":"page"},{"location":"scattering/#Functions","page":"Scattering","title":"Functions","text":"","category":"section"},{"location":"scattering/","page":"Scattering","title":"Scattering","text":"scattered_electric_field","category":"page"},{"location":"scattering/#CoupledDipoles.scattered_electric_field","page":"Scattering","title":"CoupledDipoles.scattered_electric_field","text":"scattered_electric_field(problem, atomic_states, sensor_positions; regime=:far_field)\n\nReturns a Matrix{ComplexF64} with value of the Eletric Laser + Electric Scattered from atoms\n\nproblem: LinearOptics or NonLinearOptics\natomic_states: β for Scalar/Vectorial Model, or [β,z] for Mean Field Model\nsensor_positions: matrix with measurement points\n\nNote:\n\nScalar problem returns a Matrix and not a Vector, to maintain consistency   with Vectorial problem that necessary returns a Matrix,   where each column has the [Ex, Ey, Ez] components of the field.\nAlso, even for single sensor, returns a Matrix of one element.\n\nExample\n\nusing CoupledDipoles, Random\nRandom.seed!(111)\nN = 5\nkR, kh = 1.0, 1.0\natoms = Atom(Cylinder(), N, kR, kh)\n\ns, Δ = 1e-5, 1.0\nlaser = Laser(PlaneWave3D(), s, Δ; polarization=[1,0,0])\n\nproblem_scalar = LinearOptics(Scalar(), atoms, laser)\nproblem_vectorial = LinearOptics(Vectorial(), atoms, laser)\n\natomic_states_scalar = steady_state(problem_scalar)\natomic_states_vectorial = steady_state(problem_vectorial)\n\n## 1 sensor\nRandom.seed!(222)\nnSensors = 1\nsensor = Matrix(rand(3, nSensors)) # '3' == sensor in position in 3D space\nscattered_electric_field(problem_scalar, atomic_states_scalar, sensor)\nscattered_electric_field(problem_vectorial, atomic_states_vectorial, sensor)\n\n\n## 10 sensors\nRandom.seed!(333)\nnSensors = 10\nsensor = rand(3, nSensors) # '3' == sensor in position in 3D space\nscattered_electric_field(problem_scalar, atomic_states_scalar, sensor)\nscattered_electric_field(problem_vectorial, atomic_states_vectorial, sensor)\n\n\n\n\n\n","category":"function"},{"location":"scattering/","page":"Scattering","title":"Scattering","text":"laser_and_scattered_intensity","category":"page"},{"location":"scattering/#CoupledDipoles.laser_and_scattered_intensity","page":"Scattering","title":"CoupledDipoles.laser_and_scattered_intensity","text":"laser_and_scattered_intensity(problem, atomic_states, sensor_positions; regime=:far_field)\n\nReturns a Vector{Float64} with value of the |Electric Laser + Electric Scattered|^2 from atoms\n\nproblem: LinearOptics or NonLinearOptics\natomic_states: β for Scalar/Vectorial Model, or [β,z] for Mean Field Model\nsensor_positions: matrix with measurement points\n\n\n\n\n\n","category":"function"},{"location":"scattering/","page":"Scattering","title":"Scattering","text":"scattered_intensity","category":"page"},{"location":"scattering/#CoupledDipoles.scattered_intensity","page":"Scattering","title":"CoupledDipoles.scattered_intensity","text":"scattered_intensity(problem, atomic_states, sensor_positions; regime=:far_field)\n\nReturns a Vector{Float64} with value of the |Electric Scattered|^2 from atoms\n\nproblem: LinearOptics or NonLinearOptics\natomic_states: β for Scalar/Vectorial Model, or [β,z] for Mean Field Model\nsensor_positions: matrix with measurement points\n\nExample\n\nusing CoupledDipoles, Random\nRandom.seed!(111)\nN = 5\nkR, kh = 1.0, 1.0\natoms = Atom(Cylinder(), N, kR, kh)\n\ns, Δ = 1e-5, 1.0\nlaser = Laser(PlaneWave3D(), s, Δ; polarization=[1,0,0])\n\nproblem_scalar = LinearOptics(Scalar(), atoms, laser)\nproblem_vectorial = LinearOptics(Vectorial(), atoms, laser)\n\natomic_states_scalar = steady_state(problem_scalar)\natomic_states_vectorial = steady_state(problem_vectorial)\n\n## 1 sensor\nRandom.seed!(222)\nnSensors = 1\nsensor = Matrix(rand(3, nSensors)) # '3' == sensor in position in 3D space\nscattered_intensity(problem_scalar, atomic_states_scalar, sensor)\nscattered_intensity(problem_vectorial, atomic_states_vectorial, sensor)\n\n\n## 10 sensors\nRandom.seed!(333)\nnSensors = 10\nsensor = rand(3, nSensors) # '3' == sensor in position in 3D space\nscattered_intensity(problem_scalar, atomic_states_scalar, sensor)\nscattered_intensity(problem_vectorial, atomic_states_vectorial, sensor)\n\n\n\n\n\n","category":"function"},{"location":"scattering/","page":"Scattering","title":"Scattering","text":"get_intensity_over_an_angle","category":"page"},{"location":"scattering/#CoupledDipoles.get_intensity_over_an_angle","page":"Scattering","title":"CoupledDipoles.get_intensity_over_an_angle","text":"get_intensity_over_an_angle(problem::LinearOptics{Scalar}, atoms_states::AbstractVector, θ_range::AbstractVector)\n\nUsed for the same state and many angles (suitable for cbs)\n\nusing CoupledDipoles, Random\nRandom.seed!(111)\nN = 5\nkR, kh = 1.0, 1.0\natoms = Atom(Cylinder(), N, kR, kh)\n\ns, Δ = 1e-5, 1.0\nlaser = Laser(PlaneWave3D(), s, Δ; polarization=[1,0,0])\n\nproblem_scalar = LinearOptics(Scalar(), atoms, laser)\natomic_states_scalar = steady_state(problem_scalar)\n\nθ_range = deg2rad.(range(0, 360, length=30))\nget_intensity_over_an_angle(problem_scalar, atomic_states_scalar, θ_range)\n\n\n\n\n\nget_intensity_over_an_angle(problem::LinearOptics{Scalar}, atoms_states::Vector, θ::Number; tol=exp10(-7.4))\n\nUsed for the single angle and single single state (most probably user case).\n\nExample:\n\nusing CoupledDipoles, Random\nRandom.seed!(111)\nN = 5\nkR, kh = 1.0, 1.0\natoms = Atom(Cylinder(), N, kR, kh)\n\ns, Δ = 1e-5, 1.0\nlaser = Laser(PlaneWave3D(), s, Δ; polarization=[1,0,0])\n\nproblem_scalar = LinearOptics(Scalar(), atoms, laser)\natomic_states_scalar = steady_state(problem_scalar)\n\nθ = deg2rad(48)\nget_intensity_over_an_angle(problem_scalar, atomic_states_scalar, θ)\n\n\n\n\n\nget_intensity_over_an_angle(problem::LinearOptics{Scalar}, atoms_states::Vector{Vector{ComplexF64}}, θ::Number; tol=exp10(-7.4), exact_solution=false)\n\nUsed for the same angle and different states (for example, the output of time_evolution).\n\nExample:\n\nusing CoupledDipoles, Random\nRandom.seed!(111)\nN = 5\nkR, kh = 1.0, 1.0\natoms = Atom(Cylinder(), N, kR, kh)\n\ns, Δ = 1e-5, 1.0\nlaser = Laser(PlaneWave3D(), s, Δ; polarization=[1,0,0])\n\nproblem_scalar = LinearOptics(Scalar(), atoms, laser)\nu0 = default_initial_condition(problem_scalar)\ntspan = (0.0, 10.0)\nsolutions = time_evolution(problem_scalar, u0, tspan)\nstates = solutions.u\n\nθ = deg2rad(48)\nget_intensity_over_an_angle(problem_scalar, states, θ)\n\n\n\n\n\n","category":"function"},{"location":"variances_angles/rayleigh_variance/#Deviations-from-Rayleigh's-law","page":"Intensity Statistics","title":"Deviations from Rayleigh's law","text":"","category":"section"},{"location":"variances_angles/rayleigh_variance/","page":"Intensity Statistics","title":"Intensity Statistics","text":"Our goal is to reproduce Figure 2 from the paper Cottier et all, 2019, where the authors studied the statistics of the scattered light, and found that the variance of the intensity distribution deviates from the expected Rayleigh's law.","category":"page"},{"location":"variances_angles/rayleigh_variance/","page":"Intensity Statistics","title":"Intensity Statistics","text":"With exception of the Step 1, the code is expected to run without any adjustments.","category":"page"},{"location":"variances_angles/rayleigh_variance/","page":"Intensity Statistics","title":"Intensity Statistics","text":"Step 1","category":"page"},{"location":"variances_angles/rayleigh_variance/","page":"Intensity Statistics","title":"Intensity Statistics","text":"Load the necessary packages. For me (the author), I prefer to execute all repetitions in parallel in my home made cluster. If you don't want parallel processing, just remove the process nodes.","category":"page"},{"location":"variances_angles/rayleigh_variance/","page":"Intensity Statistics","title":"Intensity Statistics","text":"@time begin\n    using CairoMakie, LinearAlgebra\n    using Statistics: mean, var\n    using StatsBase: fit, normalize, Histogram\nend\n\n@time begin\n    using Distributed\n\n    ## for local paralellism\n    addprocs(2; exeflags=`--project=$(Base.active_project()) --threads 4`, topology=:master_worker, enable_threaded_blas=true)\n\n    ## for remote machines\n    # ip_m2 = \"pc2@192.168.15.8\"\n    # nprocess_m2 = 2\n    # machine2 = [(ip_m2, nprocess_m2)]\n    # addprocs(\n    #     machine2;\n    #     topology = :master_worker,\n    #     exeflags = `--threads 6`,\n    #     enable_threaded_blas = true,\n    #     exename = \"/home/pc2/julia/julia-1.8.0-rc3/bin/julia\",\n    #     dir = \"/home/pc2\",\n    # )\n\n    # ip_m3 = \"pc3@192.168.15.7\"\n    # nprocess_m3 = 2\n    # machine3 = [(ip_m3, nprocess_m3)]\n    # addprocs(\n    #     machine3;\n    #     topology = :master_worker,\n    #     exeflags = `--threads 4`,\n    #     enable_threaded_blas = true,\n    #     exename = \"/home/pc3/julia_program/julia-1.8.0-rc3/bin/julia\",\n    #     dir = \"/home/pc3\",\n    # )\nend\n\n@time @everywhere begin\n    using CoupledDipoles\n    using ProgressMeter, Random\nend","category":"page"},{"location":"variances_angles/rayleigh_variance/","page":"Intensity Statistics","title":"Intensity Statistics","text":"Step 2 We use the exact configuration parameters from the paper. You will notice may Warning messages. This happen because a small laser waist leads to unreasonable results.","category":"page"},{"location":"variances_angles/rayleigh_variance/","page":"Intensity Statistics","title":"Intensity Statistics","text":"If you are studying Cottier's paper, note that the results from the paper are not accurate due to its small laser waist, even though they general paper's message is still correct.","category":"page"},{"location":"variances_angles/rayleigh_variance/","page":"Intensity Statistics","title":"Intensity Statistics","text":"### ------------ ATOMS SPECS ---------------------\nL = 32.4\nN = [684, 6066]\n\n\n### ------------ LASER SPECS ---------------------\nΔ = 1.0\ns = 1e-6\nw₀ = L / 4\n\n### ------------ SIMULATION SPECS ---------------------\nsensors = get_sensors_ring(; num_pts = 720, kR = 300, θ = 5π / 12)\nmaxRep = 15","category":"page"},{"location":"variances_angles/rayleigh_variance/","page":"Intensity Statistics","title":"Intensity Statistics","text":"Step 3","category":"page"},{"location":"variances_angles/rayleigh_variance/","page":"Intensity Statistics","title":"Intensity Statistics","text":"For each atom number N, create maxRep atomic configurations, compute their state states, and scattered light intensity. The normalization over the mean comes from the paper.","category":"page"},{"location":"variances_angles/rayleigh_variance/","page":"Intensity Statistics","title":"Intensity Statistics","text":"### -------- PRODUCE INTENSITIES -----------------\nall_intensities = map(N) do N\n    many_intensities = @showprogress pmap(1:maxRep) do rep\n        Random.seed!(1134 + rep)\n\n        atoms = Atom(Cube(), N, L)\n        laser = Laser(Gaussian3D(w₀), s, Δ)\n        simulation = LinearOptics(Scalar(), atoms, laser)\n\n        βₙ = steady_state(simulation)\n        intensities = scattered_intensity(simulation, βₙ, sensors; regime = :far_field)\n\n        intensities\n    end\n\n    many_intensities = reduce(vcat, many_intensities)\n    all_intensities_over_mean = many_intensities ./ mean(many_intensities)\n\n    all_intensities_over_mean\nend","category":"page"},{"location":"variances_angles/rayleigh_variance/","page":"Intensity Statistics","title":"Intensity Statistics","text":"Step 4","category":"page"},{"location":"variances_angles/rayleigh_variance/","page":"Intensity Statistics","title":"Intensity Statistics","text":"Instead of ploting histogram for each particle number, we are interested in the data from the histogram to display it in a scatter plot. Also, this is the moment to compute the variance of all intensities.","category":"page"},{"location":"variances_angles/rayleigh_variance/","page":"Intensity Statistics","title":"Intensity Statistics","text":"### ------------ CREATE HISTOGRAM ---------------------\nbins = 10.0 .^ range(log10(1e-6), log10(75); length = 30)\n\nxy_data = map(eachindex(N)) do n\n    h = fit(Histogram, all_intensities[n], bins)\n\n    h_norm = normalize(h; mode = :pdf)\n    bins_edges = collect(h_norm.edges[1])\n    bins_centers = [sqrt(bins_edges[i] * bins_edges[i+1]) for i = 1:(length(bins_edges)-1)]\n    variance = var(all_intensities[n])\n\n    # x_data_histogram, y_data_histogram, variance\n    (bins_centers, h_norm.weights, variance)\nend","category":"page"},{"location":"variances_angles/rayleigh_variance/","page":"Intensity Statistics","title":"Intensity Statistics","text":"Step 5","category":"page"},{"location":"variances_angles/rayleigh_variance/","page":"Intensity Statistics","title":"Intensity Statistics","text":"Overlay the Distribution Probability in a single figure.","category":"page"},{"location":"variances_angles/rayleigh_variance/","page":"Intensity Statistics","title":"Intensity Statistics","text":"The begin-end structure is just to facilitate the Figure development for the user. It is easier to just run the block at once at every little plot tweak, than select and run everything all the time.","category":"page"},{"location":"variances_angles/rayleigh_variance/","page":"Intensity Statistics","title":"Intensity Statistics","text":"### ------------ FINAL PLOT ---------------------\nbegin\n    fig = Figure(resolution = (800, 450))\n    ax = Axis(\n        fig[1, 1],\n        xlabel = \"Intensity\",\n        ylabel = \"Probability Distribution\",\n        title = \"\",\n        xlabelsize = 25,\n        ylabelsize = 25,\n        xticklabelsize = 20,\n        yticklabelsize = 20,\n        xscale = log10,\n        yscale = log10,\n    )\n\n    ## theoretical curve\n    x_ray = range(0.01, 50; step = 0.15)\n    y_ray = exp.(-x_ray)\n    lines!(ax, x_ray, y_ray, linestyle = :dash, label = \"Rayleigh\", color = :black, lw = 4)\n\n    for n = 1:2\n        x = xy_data[n][1]\n        y = xy_data[n][2]\n        v = xy_data[n][3] # variance\n        notNull = findall(y .> 0)\n        scatter!(\n            ax,\n            x[notNull],\n            y[notNull];\n            label = \"N=$(N[n]), Variance = $( round(v,digits=3 ))\",\n            markershape = :circle,\n            markersize = 20,\n        )\n    end\n    ylims!(1e-6, 10)\n    xlims!(1e-1, 100)\n    axislegend(position = :rt, labelsize = 20)\n    fig\nend","category":"page"},{"location":"variances_angles/rayleigh_variance/","page":"Intensity Statistics","title":"Intensity Statistics","text":"(Image: Rayleigh Deviation)","category":"page"},{"location":"#CoupledDipoles.jl","page":"Home","title":"CoupledDipoles.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"A Package In Development","category":"page"},{"location":"#**Installation**","page":"Home","title":"Installation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"On the REPL type","category":"page"},{"location":"","page":"Home","title":"Home","text":"import Pkg\nPkg.add(url=\"https://github.com/NoelAraujo/CoupledDipoles.jl\")\n\n\njulia> using CoupledDipoles\n\n# pkg> test CoupledDipoles","category":"page"},{"location":"","page":"Home","title":"Home","text":"This package uses Bessel, because is faster than SpecialFunctions, but MAYBE you had to install it manually.","category":"page"},{"location":"","page":"Home","title":"Home","text":"import Pkg;\n\nPkg.add(url=\"https://github.com/JuliaMath/Bessels.jl\")\nPkg.add(url=\"https://github.com/NoelAraujo/CoupledDipoles.jl\")","category":"page"},{"location":"#Manual-Outline","page":"Home","title":"Manual Outline","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"","category":"page"},{"location":"dipole_example/single_atom_volume/#Single-Atom","page":"Single Atom","title":"Single Atom","text":"","category":"section"},{"location":"dipole_example/single_atom_volume/","page":"Single Atom","title":"Single Atom","text":"The special case of a single atom is the radiation pattern of a dipole, defined in electromagnetism books.","category":"page"},{"location":"dipole_example/single_atom_volume/","page":"Single Atom","title":"Single Atom","text":"To create a single atom system, set N=1 and any other function should function accordingly. Note that all functions will return a Matrix of 1 element. This was an intentional decision to make internal functions interoperate effectively - if all inputs were a matrix, there was no ambiguity about the number of particles.","category":"page"},{"location":"dipole_example/single_atom_volume/","page":"Single Atom","title":"Single Atom","text":"We need to use the Vectorial model to best visualize the radiation pattern. The code below is a minimal working example for checking the radiation pattern through a volume slice. The laser will be pointing in the negative x-direction, to make the visualization clearer.","category":"page"},{"location":"dipole_example/single_atom_volume/","page":"Single Atom","title":"Single Atom","text":"using CoupledDipoles, Random\n\n# cloud settings\nN = 1\nkR = 10\n\n# laser settings\nw₀ = 4π\ns = 1e-5\nΔ = 0.0\n\nRandom.seed!(2044)\nsingle_atom =Atom(CoupledDipoles.Cylinder(), N, kR, kR)\nlaser = Laser(Gaussian3D(w₀), s, Δ; direction=[-1,0,0], polarization=[0,0,1])\nproblem = LinearOptics(Vectorial(), single_atom, laser)\nβₙ = steady_state(problem)","category":"page"},{"location":"dipole_example/single_atom_volume/","page":"Single Atom","title":"Single Atom","text":"We had to apply :near_field regime manually to compute the intensity, because the default regime is :far_field. To evaulate the intensity in a certain spatial domain, we  use a list comprehension.","category":"page"},{"location":"dipole_example/single_atom_volume/","page":"Single Atom","title":"Single Atom","text":"x = LinRange(-100, 100, 100)\ny = LinRange(-100, 100, 100)\nz = LinRange(-100, 100, 100)\n\n## this plot only works for near field regime\n_vol = [laser_and_scattered_intensity(problem, βₙ, Matrix([X Y Z]');regime=:near_field)[1] for X ∈ x, Y ∈ y, Z ∈ z]\nlaserOn = log10.(_vol)\n\n_vol = [scattered_intensity(problem, βₙ, Matrix([X Y Z]');regime=:near_field)[1] for X ∈ x, Y ∈ y, Z ∈ z]\nlaserOff = log10.(_vol)","category":"page"},{"location":"dipole_example/single_atom_volume/","page":"Single Atom","title":"Single Atom","text":"The package Makie is not a dependence of CoupledDipoles. Please, install it.","category":"page"},{"location":"dipole_example/single_atom_volume/","page":"Single Atom","title":"Single Atom","text":"In the following, the figures represents the radiation in space for single atom and the color range was choosen ad hoc to higlight the expected dipole radiation pattern.","category":"page"},{"location":"dipole_example/single_atom_volume/","page":"Single Atom","title":"Single Atom","text":"using ColorSchemes\nusing WGLMakie\nWGLMakie.activate!()\n\n## Example 1\nlet\n    fig = Figure(resolution = (800, 600))\n    ax_on = Axis3(fig[1, 1], title = \"Dipole Radiation\", aspect=:data)\n\n    on_plt = volumeslices!(ax_on, x, y, z, laserOff,\n        colormap=cgrad( ColorSchemes.linear_kryw_0_100_c71_n256, rev=false),\n        colorrange=(-11, -9)\n        )\n    on_plt[:update_yz][](100)\n    on_plt[:update_xz][](50)\n    on_plt[:update_xy][](1)\n\n    # save(\"dipole_radiation.png\", fig, resolution = (800, 600))\n    fig\nend","category":"page"},{"location":"dipole_example/single_atom_volume/","page":"Single Atom","title":"Single Atom","text":"(Image: Dipole Radiation)","category":"page"},{"location":"dipole_example/single_atom_volume/","page":"Single Atom","title":"Single Atom","text":"## Example 2\nlet\n    fig = Figure(resolution = (900, 800), background_color=:transparent)\n    ax_on = Axis3(fig[1, 1], title = \"Laser On\", aspect=:data)\n    ax_off = Axis3(fig[1, 2], title = \"Laser Off\", aspect=:data)\n\n    on_plt = volumeslices!(ax_on, x, y, z, laserOn,\n        colormap=cgrad( ColorSchemes.linear_kryw_0_100_c71_n256, rev=false),\n        colorrange=(-11, -9)\n        )\n    on_plt[:update_yz][](100)\n    on_plt[:update_xz][](50)\n    on_plt[:update_xy][](1)\n\n    off_plt = volumeslices!(ax_off, x, y, z, laserOff,\n        colormap=cgrad( ColorSchemes.linear_kryw_0_100_c71_n256, rev=false),\n        colorrange=(-11, -9)\n        )\n    off_plt[:update_yz][](100)\n    off_plt[:update_xz][](50)\n    off_plt[:update_xy][](1)\n\n    cbar = Colorbar(fig, off_plt; label=\"log10( Intensity )\", flipaxis=false,  vertical = false, width = Relative(4/5),ticks=WilkinsonTicks(3))\n    fig[2, :] = cbar\n\n    # save(\"on_off_radiation.png\", fig, resolution = (800, 600))\n    fig\nend","category":"page"},{"location":"dipole_example/single_atom_volume/","page":"Single Atom","title":"Single Atom","text":"(Image: Laser On and Off)","category":"page"}]
}
